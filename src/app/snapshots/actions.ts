"use server";

import { Policy } from "./form";

const headers = new Headers();
headers.append("Content-Type", "application/json");

export async function updateSnapshot(id: string, policy: Policy) {
  const requestOptions: RequestInit = {
    method: "PUT",
    headers,
    body: JSON.stringify(policy),
    redirect: "follow",
  };
  const data = await fetch(`${process.env.API_URL}/snapshots/${id}`, requestOptions).then(
    (res) => res.json()
  );
  console.log(data.body);
  //   redirect("/snapshots");
}
