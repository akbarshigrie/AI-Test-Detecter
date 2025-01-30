async function detectText() {
    const API_URL = "https://api-inference.huggingface.co/models/akshayvkt/detect-ai-text";
    const API_TOKEN = "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";  // Replace this with your Hugging Face API key

    const text = document.getElementById("textInput").value;
    const resultElement = document.getElementById("result");

    if (!text.trim()) {
        resultElement.innerHTML = "Please enter some text.";
        return;
    }

    resultElement.innerHTML = "Checking...";

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ inputs: text })
    });

    const data = await response.json();

    if (!data || data.error) {
        resultElement.innerHTML = "Error: Unable to check text.";
        return;
    }

    const confidence = data[0][1].score; // Assuming index 1 is AI-generated
    resultElement.innerHTML = `Confidence AI-generated: <strong>${(confidence * 100).toFixed(2)}%</strong>`;
}
