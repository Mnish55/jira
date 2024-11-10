import "server-only"

import { Client, Account } from "node-appwrite";

export async function createAdminClient() {
    const client = new Client()
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject("672731ec0023b4f444d9")
      .setKey("standard_e5b6c601a6d92dec77839b05c87e804e6443199a967a805e7478e336927b33936b63c9b280a031218235f57e6853601d975b6f5aa75ee89707ead12a730a42ed9746e67aa5d847198dd7341b219102aeb55c1d98a08693ba3de5296947d89bf0a200f0a2cbc1876a78332b80c18e9123a260bf8b86814d48db7e9a51ceda2ffe");
  
    return {
      get account() {
        return new Account(client);
      },
    };
  }