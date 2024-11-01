import * as pulumi from "@pulumi/pulumi";
import * as digitalocean from "@pulumi/digitalocean";
import * as path from "path";
import * as os from "os";
import * as fs from "fs";

function readPublicKey() {
  const keyPath = path.join(os.homedir(), ".ssh/pulumi", "id_rsa.pub");
  return fs.readFileSync(keyPath, "utf-8");
}

const sshKey = new digitalocean.SshKey("my-ssh-key", {
  publicKey: readPublicKey(),
});

const web = new digitalocean.Droplet("web", {
  image: "ubuntu-20-04-x64",
  name: "web-1",
  sshKeys: [sshKey.fingerprint],
  region: digitalocean.Region.NYC2,
  size: digitalocean.DropletSlug.DropletS1VCPU1GB,
});

export const ipAddress = web.ipv4Address;
