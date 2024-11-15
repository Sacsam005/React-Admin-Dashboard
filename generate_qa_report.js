const { WebClient } = require('@slack/web-api');
const { execSync } = require('child_process');
const { Configuration, OpenAIApi } = require('openai');
const axios = require('axios');
const sharp = require('sharp');

const openAIKey = process.env.OPENAI_API_KEY;
const token = process.env.SLACK_API_TOKEN;
const channelId = process.env.SLACK_CHANNEL_ID;


if (!openAIKey || !token || !channelId) {
    console.error("Error: Missing required environment variables.");
    process.exit(1);
}

const configuration = new Configuration({
    apiKey: openAIKey,
});

const webSlackClient = new WebClient(token);
const openai = new OpenAIApi(configuration);

const getGPTResponse = async (request) => {
    try {
        const response = await openai.createChatCompletion({
            model: 'gpt-4',
            messages: [
                { role: 'system', content: 'Jesteś pomocnym asystentem.' },
                { role: 'user', content: request },
            ],
        });
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Error in getGPTResponse:', error.response?.data || error.message);
        return null;
    }
};

const generateAIImage = async (imagePrompt) => {
    try {
        console.log("## Step : Initial image generating with Dall-e ...");
        const response = await openai.createImage({
            prompt: imagePrompt,
            n: 1,
            size: '1024x1024',
        });
        const imageUrl = response.data.data[0].url; // Odczytaj dane z poprawnej struktury odpowiedzi
        return imageUrl;
    } catch (error) {
        console.error('Error generating image:', error.response?.data || error.message);
        throw new Error('Failed to generate image');
    }
};

async function sendImageToSlack(imageUrl, qaReport) {
    try {
        console.log("## Step : Sending image with report into slack ...");
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(response.data);
        const resizedImageBuffer = await sharp(imageBuffer).resize(256, 256).toBuffer();
        await webSlackClient.files.uploadV2({
            channel_id: channelId,
            filename: 'difficulty_level.png',
            file: resizedImageBuffer,
            initial_comment: qaReport,
        });
        console.log('Image sent to Slack!');
    } catch (error) {
        console.error('Error sending image to Slack:', error.data || error.message);
    }
}

function getChangedFiles() {
    try {
        const output = execSync('git diff --name-only HEAD~1 HEAD').toString();
        return output.trim().split('\n').filter(Boolean);
    } catch (error) {
        console.error('Error getting changed files:', error);
        return [];
    }
}

function getFileDiffs(files) {
    const diffs = {};
    files.forEach((file) => {
        try {
            const diff = execSync(`git diff HEAD~1 HEAD -- ${file}`).toString();
            diffs[file] = diff;
        } catch (error) {
            console.error(`Error getting diff for file ${file}:`, error);
        }
    });
    return diffs;
}

function preparePrompt(fileDiffs) {
    const projectDescription = 'Projekt: Aplikacja webowa do zarządzania zadaniami...';
    let prompt = `${projectDescription}\n\nZmiany w plikach:\n`;
    let totalLength = 0;
    const MAX_TOKENS = 3000;

    for (const [file, diff] of Object.entries(fileDiffs)) {
        const diffLength = diff.length;
        if (totalLength + diffLength > MAX_TOKENS) {
            prompt += `- \`${file}\`: (zmiany pominięte ze względu na limit)\n`;
            continue;
        }
        prompt += `- \`${file}\`:\n\`\`\`\n${diff}\n\`\`\`\n`;
        totalLength += diffLength;
    }

    prompt += `
Please analyze the above changes and generate a QA report that includes:

1. The exact changes made to the application.
2. The parts of the application affected.
3. Specifically, what the QA team should test.
4. Potential side effects or additional areas requiring attention.

Give me answer in english.
`;

    return prompt;
}

const getDifficultyLevel = async (qaReportContent) => {
    try {
        console.log("## Step: Detecting changes risk level based on QA report ...");

        const response = await openai.createChatCompletion({
            model: 'gpt-4',
            messages: [
                { role: 'system', content: 'Jesteś QA team leadem.' },
                {
                    role: 'user',
                    content: `Dostajesz od zespołu QA raport zmian które powstały w wyniku ostatniego merge requesta, 
                    musisz go przeanalizować: 1) pod kontem trudności testowania; 2) ryzykiem powstania ewentualnych bugów, 
                    jako wynik analizy zmian, masz zwrócić mi tylko wartość integer od 1 do 4, gdzie 1 - niegroźne zmiany, 
                    łatwe do testowania; 4 - duże i skomplikowane zmiany, ryzyko bugów i breakable changes, 
                    a oto jest text raportu od QA: ${qaReportContent}`,
                },
            ],
        });
        return response.data.choices[0].message.content.trim(); // Używaj response.data
    } catch (error) {
        console.error('Error in getDifficultyLevel:', error.response?.data || error.message);
        return null; // Zwróć null w przypadku błędu
    }
};

async function getImagePromptforCurrentDifficulty(difficultyLevel) {
    let prompt;
    if (difficultyLevel === 1) {
        prompt = "Śmieszny obrazek królika testującego prostą aplikację frontendową";
    } else if (difficultyLevel === 2) {
        prompt = "Lis programista debugujący zawiłości interfejsu użytkownika";
    } else if (difficultyLevel === 3) {
        prompt = "Grupa pingwinów próbujących naprawić skomplikowany błąd w aplikacji webowej";
    } else if (difficultyLevel === 4) {
        prompt = "Sowa w okularach intensywnie testująca zaawansowany frontend";
    } else {
        prompt = "Zwierzęta jako programiści pracujący nad aplikacją";
    }
    prompt += "; ma być bez znaków specjalnych, tylko opis, może zawierać postać lub postacie zwierzaków jako programistów. Całkowita długość promptu ma nie przekraczać 400 znaków i być bardzo prosty bez żadnych dodatkowych textów, tylko sam obrazek";

    console.log("## Step : Generating custom image prompt based on changes difficulty level ...");

    const gptGeneratedImagePrompt = await getGPTResponse(prompt);

    return gptGeneratedImagePrompt;
}

(async () => {
    const changedFiles = getChangedFiles();
    if (changedFiles.length === 0) {
        console.log('No changes detected.');
        return;
    }
    const fileDiffs = getFileDiffs(changedFiles);
    const prompt = preparePrompt(fileDiffs);
    const qaReport2 = await getGPTResponse(prompt);

    if (!qaReport2) {
        console.error("Failed to generate QA report. Exiting.");
        return;
    }

    const difficultyLevel = await getDifficultyLevel(qaReport2);

    if (!difficultyLevel) {
        console.error("Failed to determine difficulty level. Exiting.");
        return;
    }

    const imagePrompt = await getImagePromptforCurrentDifficulty(Number(difficultyLevel.trim()));

    if (!imagePrompt) {
        console.error("Failed to generate image prompt. Exiting.");
        return;
    }

    try {
        const imageUrl = await generateAIImage(imagePrompt);
        if (imageUrl) {
            await sendImageToSlack(imageUrl, qaReport2);
        }
    } catch (error) {
        console.error('Error in generateAndSendImage:', error);
    }
})();
