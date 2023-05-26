// 1- create database: 2- connect with database: 3- create table(data) (same as model in contentful) in SQL
// To create database we first deploy the project at VERCEL, Then we go to vercel and and to the deployed project. In project "storage" tab we crate the data base. In this way the database is automatically connected to our project and we don't need to connect it manually.
// In this way "environment variables" needed to connect to database are created automatically.
// We can access these variables by going to "settings" tab.
// Then we pull these variables to our local project by using this command "vercel env pull .env.development.local".


import { db } from "@vercel/postgres"; //to communicate with the data base that we created at VERCEL
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const client = await db.connect(); //function to connect with DB for communication

  //try-catch method is used for error handling of "await"
  try {
    await client.sql`CREATE TABLE IF NOT EXISTS Todo(id serial, Task varchar(255))`;
    return NextResponse.json({ message: "You called this api." });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Something went wrong" });
  }
}

export async function postMessage(request: NextRequest) {
  const req = await request.json();
  const client = await db.connect();
  try {
    if (req.task) {
      await client.sql`INSERT INTO Todos(Task) VALUES(${req.task})`;
      return NextResponse.json({message:"Data entered"})
    } else {
      throw new Error("Task filed is required");
    }
  } catch (error) {
    return NextResponse.json({message: (error as { message: string }).message});
  }
}
