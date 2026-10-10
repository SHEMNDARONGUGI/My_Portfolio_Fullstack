import assert from "node:assert/strict";
import { once } from "node:events";
import type { AddressInfo } from "node:net";
import test from "node:test";
import app from "../src/app.js";

test("API health, Swagger docs, and contact route access", async () => {
  const server = app.listen(0, "127.0.0.1");
  await once(server, "listening");
  const address = server.address() as AddressInfo;
  const baseUrl = `http://127.0.0.1:${address.port}`;

  try {
    const healthResponse = await fetch(`${baseUrl}/`);
    assert.equal(healthResponse.status, 200);
    assert.deepEqual(await healthResponse.json(), {
      message: "Portfolio API is running",
    });

    const specResponse = await fetch(`${baseUrl}/api-docs.json`);
    assert.equal(specResponse.status, 200);
    const spec = (await specResponse.json()) as {
      openapi: string;
      paths: Record<string, unknown>;
    };
    assert.equal(spec.openapi, "3.0.3");
    assert.ok(spec.paths["/api/v1/projects"]);
    assert.ok(spec.paths["/api/v1/contact"]);

    const docsResponse = await fetch(`${baseUrl}/api-docs/`);
    assert.equal(docsResponse.status, 200);
    assert.match(await docsResponse.text(), /swagger-ui/i);

    const invalidContactResponse = await fetch(
      `${baseUrl}/api/v1/contact`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Alex",
          email: "not-an-email",
          message: "Hello",
        }),
      },
    );
    assert.equal(invalidContactResponse.status, 400);

    const inboxResponse = await fetch(`${baseUrl}/api/v1/contact`);
    assert.equal(inboxResponse.status, 401);
  } finally {
    server.close();
    await once(server, "close");
  }
});
