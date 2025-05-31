import dakwacoCrawService from "./services/dakwaco-craw";

  async function main() {
  await dakwacoCrawService(10602133, 10620133);

  console.log("Crawling completed.");
}

main().catch((err) => console.error("Unexpected error:", err));
