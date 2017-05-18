export async function getMusicBuffer(url) {
  const response = await fetch(url);
  return response.arrayBuffer();
}