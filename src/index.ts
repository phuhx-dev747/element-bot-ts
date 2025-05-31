import dakwacoCrawService from "./services/dakwaco-craw";

  async function main() {
  await dakwacoCrawService(17000003, 17000004);

  console.log("Crawling completed.");
}

main().catch((err) => console.error("Unexpected error:", err));
