import * as pulumi from "@pulumi/pulumi";
import * as digitalocean from "@pulumi/digitalocean";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";

function readPublicKey() {
  const keyPath = path.join(os.homedir(), ".ssh/pulumi", "id_rsa.pub");
  return fs.readFileSync(keyPath, "utf-8");
}

const sshKey = new digitalocean.SshKey("my-ssh-key", {
  publicKey: readPublicKey(), // Replace with your SSH public key
});

// Create a new Web Droplet in the nyc2 region
const web = new digitalocean.Droplet("web", {
  image: "ubuntu-20-04-x64",
  name: "web-1",
  sshKeys: [sshKey.fingerprint],
  region: digitalocean.Region.NYC2,
  size: digitalocean.DropletSlug.DropletS1VCPU1GB,
});

export const ipAddress = web.ipv4Address;
