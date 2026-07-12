const BASE_URL = "http://127.0.0.1:8000";

export async function checkServerStatus() {
  try {
    const res = await fetch(`${BASE_URL}/`);
    if (!res.ok) throw new Error("Server not reachable");
    return await res.json();
  } catch (err) {
    return { message: "offline", error: err.message };
  }
}

export async function uploadPDF(file, onProgress) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${BASE_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error(`Upload failed with status ${res.status}`);
  }

  return await res.json();
}

export async function askQuestion(question) {
  const res = await fetch(`${BASE_URL}/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });

  if (!res.ok) {
    throw new Error(`Ask failed with status ${res.status}`);
  }

  return await res.json();
}
