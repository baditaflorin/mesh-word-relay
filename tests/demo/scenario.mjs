export default async function wordRelayScenario(a, b) {
  await a.getByLabel("Next word or phrase").fill("Once");
  await a.getByRole("button", { name: "Pass it on" }).click();
  await b.getByText("Once").waitFor({ timeout: 10_000 });
  await b.getByLabel("Next word or phrase").fill("again");
  await b.getByRole("button", { name: "Pass it on" }).click();
  await a.getByText("again").waitFor({ timeout: 10_000 });
  await a.waitForTimeout(1_000);
}
