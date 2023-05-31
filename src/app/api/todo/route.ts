// 1- create database: 2- connect with database: 3- create table(data) (same as model in contentful) in SQL
// To create database we first deploy the project to VERCEL, Then we go to vercel dash board and and to the deployed project. In project "storage" tab we crate the data base. In this way the database is automatically connected to our project and we don't need to connect it manually.
// In this way "environment variables" needed to connect to database are created automatically.
// We can access these variables by going to "settings" tab.
// Then we pull these variables to our local project by using this command "vercel env pull .env.development.local".

//import { QueryResult } from "@vercel/postgres"; //to communicate with the data base that we created at VERCEL

import { NextRequest, NextResponse } from "next/server";
import { Todo, NewTodo, db, todoTable } from "@/lib/drizzle";
import { sql } from "@vercel/postgres";

export async function GET(request: NextRequest) {
  // const client = await db.connect(); //function to connect with DB for communication

  //try-catch method is used for error handling of "await"
  try {
    await sql`CREATE TABLE IF NOT EXISTS Todo(id serial, Task varchar(255))`;
    const res = await db.select().from(todoTable);
    console.log(res);
    // const res = await client.sql`SELECT * FROM Todos`  // * stands for all
    //to find the item with id : 1
    // console.log(res.rows.find( (item) => item.id === 1))
    return NextResponse.json({ data: res });
  } catch (err) {
    console.log((err as { message: string }).message);
    return NextResponse.json({ message: "Something went wrong" });
  }
}

export async function POST(request: NextRequest) {
  const req = await request.json();

  try {
    if (req.task) {
      const res = await db
        .insert(todoTable)
        .values({
          task: req.task,
        })
        .returning();
      console.log(res);
      return NextResponse.json({ message: "Data added successfully." });
    } else {
      throw new Error("Task filed is required");
    }
  } catch (error) {
    return NextResponse.json({
      message: (error as { message: string }).message,
    });
  }
}
