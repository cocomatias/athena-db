# AthenaDB 🌐

Welcome to AthenaDB, an open-source initiative aimed at revolutionizing how we interact with large datasets using the power of artificial intelligence. Named after the Greek goddess of wisdom 🦉, AthenaDB embodies intelligence, strategic warfare, and diplomacy, reflecting the project's core principles: smart data segmentation, strategic querying, and seamless integration.

## Overview 📜

AthenaDB is designed to tackle the challenges posed by the token limitations of GPT models in handling extensive datasets. By breaking down data into manageable 'chunks,' AthenaDB facilitates more efficient storage, retrieval, and summarization of information. It leverages the prowess of GPT-powered question assigners to intelligently navigate and utilize data, regardless of scale.

Our goal is to create an API-driven environment where developers can store data in segmented blocks, each corresponding to a GPT model's token capacity. This segmentation allows for an expansion of tokens available to queries, thus circumventing the token limitations that typically constrain such AI models.

## Installation 🛠️

To install AthenaDB, follow these steps:

1.  Clone the repository:

    ```bash
    git clone [repo-url]
    ```

2.  Install the required packages:

    ```bash
    yarn install
    ```

3.  Start the development server:

    ```bash
    yarn dev
    ```

4.  Create an `.env` file. See references on [.env.example](.env.example) for more information.

5.  Enable vectors extension in Supabase

    You have to enable vectors in your Supabase project. To do so, go to:

    `Dashboard > Project > Database > Extensions > Enable "vector" extension`.

6.  Create tables in Supabase

    1. `ai_db_table` Table:

       ```sql
       create table
       public.ai_db_table (
           id uuid not null default gen_random_uuid (),
           created_at timestamp with time zone not null default now(),
           updated_at timestamp with time zone not null default now(),
           description text null,
           name text not null,
           constraint ai_db_table_pkey primary key (id),
           constraint ai_db_table_name_key unique (name)
       ) tablespace pg_default;
       ```

    2. `ai_db_data_chunk` Table:

       ```sql
       create table
       public.ai_db_data_chunk (
           id uuid not null default gen_random_uuid (),
           created_at timestamp with time zone not null default now(),
           updated_at timestamp with time zone not null default now(),
           formatted_data text not null,
           summary text not null,
           ai_table_name text not null,
           tokens integer not null,
           constraint ai_db_data_chunk_pkey primary key (id),
           constraint ai_db_data_chunk_ai_table_name_fkey foreign key (ai_table_name) references ai_db_table (name) on delete cascade
       ) tablespace pg_default;
       ```

    3. `ai_db_data` Table:

       ```sql
       create table
       public.ai_db_data (
           id uuid not null default gen_random_uuid (),
           created_at timestamp with time zone not null default now(),
           updated_at timestamp with time zone not null default now(),
           data jsonb not null,
           data_chunk uuid not null,
           ai_table_name text not null,
           embedding public.vector not null,
           tokens integer not null,
           formatted_data text not null,
           constraint ai_db_data_pkey primary key (id),
           constraint ai_db_data_ai_table_name_fkey foreign key (ai_table_name) references ai_db_table (name) on delete cascade,
           constraint ai_db_data_data_chunk_fkey foreign key (data_chunk) references ai_db_data_chunk (id) on delete cascade
           ) tablespace pg_default;
       ```

## Features ✨

- **Data Segmentation**: Efficiently stores data in chunks, each paired with a GPT model to optimize token usage.
- **Dynamic Summarization**: Automatically updates data summaries in chunks, ensuring that the system remains up-to-date with the latest information 🔍.
- **Scalable Querying**: Utilizes a hierarchical system of question assigners to manage and retrieve data, scaling to accommodate an ever-growing dataset 📈.
- **Token Tracking**: Includes a 'tokens' column for DataChunks and Data tables to monitor and manage token allocation effectively 📊.

## Roadmap 🗺️

- **Vectorized Caching**: Implements a vectorized caching system to enhance response times by referencing past queries with high similarity 💨.

## Philosophy 🤔

AthenaDB isn't just a database; it's a testament to the potential of AI systems to grow alongside the data they handle. With a vision for effortless scaling and a user-friendly interface, AthenaDB aspires to make complex data interactions simple and accessible.

We invite you to join us on this journey to not just build a database, but to forge a community where developers, innovators, and thinkers converge to create something truly transformative 💪.

Stay tuned for updates, and feel free to contribute to the birth of a new era in data interaction.

---

"Like Athena, emerging fully formed from the mind of Zeus, may wisdom and strength guide our creation." 🌟

---

## Contributions 🤝

Your insights and contributions are what will make AthenaDB not just functional, but exceptional. We welcome developers, writers, designers, and thinkers of all stripes to contribute to AthenaDB's growth.

## License 📄

AthenaDB is open source and available under the [MIT License](LICENSE).
