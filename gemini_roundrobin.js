// Gemini 轮询插件
let currentIndex = 0;

async function callGeminiAPI(apiKeys, prompt) {
  const apiKey = apiKeys[currentIndex];
  currentIndex = (currentIndex + 1) % apiKeys.length;

  const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + apiKey, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: prompt
            }
          ]
        }
      ]
    })
  });

  const data = await response.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
}

async function handlePrompt(userInput) {
  const apiKeys = [
    "AIzaSyD72_V50Myd6XcE2xmIBcckznvhhD8igpE",
    "AIzaSyCxZ-YzoZO1aMJhcd81LP2yxjvB3udo_hM",
    "AIzaSyDGpceOwNXKTuEBhHEgG-fHeFlgZG1nYR4",
    "AIzaSyAphKoTSArvGp2W9XnIQXRdHkcNywECAUc",
    "AIzaSyAkK7dJqREc-W5qihk47Djxj8DRrmjMRWs",
    "AIzaSyCFye-EG09p2muIc9wNbqYCK52293MpTLk"
  ];

  return await callGeminiAPI(apiKeys, userInput);
}

export default {
  onInput: async ({ inputText }) => {
    const result = await handlePrompt(inputText);
    return result;
  }
};
