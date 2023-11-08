# AthenaDB 🌐

Welcome to AthenaDB, an open-source initiative aimed at revolutionizing how we interact with large datasets using the power of artificial intelligence. Named after the Greek goddess of wisdom 🦉, AthenaDB embodies intelligence, strategic warfare, and diplomacy, reflecting the project's core principles: smart data segmentation, strategic querying, and seamless integration.

## Overview 📜

AthenaDB addresses the token limitation challenge of GPT models in processing large datasets. It eschews traditional similarity/vector searches to minimize AI inefficiencies and reduce the occurrence of inaccurate information ("hallucinations"). By segmenting data into manageable units, AthenaDB enhances data storage, retrieval, and summarization, utilizing GPT-driven question assigners for scalable and intelligent data handling.

Our mission: to engineer an API-centric ecosystem where data is stored in segments aligned with a GPT model's token capacity, expanding the token horizon for queries and overcoming usual AI model constraints.

## Getting Started 🛠️

To get started with AthenaDB, execute the following steps:

1. Clone the repository to your local machine:

   ```bash
   git clone [repo-url]
   ```

2. Install the necessary dependencies using Yarn:

   ```bash
   yarn install
   ```

3. Fire up the development server:

   ```bash
   yarn dev
   ```

4. Set up your environment variables by creating an `.env` file based on the provided [.env.example](.env.example).

5. Activate the vectors extension in your Supabase project for enhanced functionality:

   Navigate to `Dashboard > Project > Database > Extensions` and enable the "vector" extension.

6. Establish the required tables in Supabase by executing the following SQL commands:

   1. `ai_db_table` Table:

      ```sql
      CREATE TABLE public.ai_db_table (
          id UUID NOT NULL DEFAULT gen_random_uuid(),
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          description TEXT NULL,
          name TEXT NOT NULL,
          PRIMARY KEY (id),
          UNIQUE (name)
      );
      ```

   2. `ai_db_data_chunk` Table:

      ```sql
      CREATE TABLE public.ai_db_data_chunk (
          id UUID NOT NULL DEFAULT gen_random_uuid(),
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          formatted_data TEXT NOT NULL,
          summary TEXT NOT NULL,
          ai_table_name TEXT NOT NULL,
          tokens INTEGER NOT NULL,
          PRIMARY KEY (id),
          FOREIGN KEY (ai_table_name) REFERENCES ai_db_table (name) ON DELETE CASCADE
      );
      ```

   3. `ai_db_data` Table:

      ```sql
      CREATE TABLE public.ai_db_data (
          id UUID NOT NULL DEFAULT gen_random_uuid(),
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          data JSONB NOT NULL,
          data_chunk UUID NOT NULL,
          ai_table_name TEXT NOT NULL,
          embedding VECTOR NOT NULL,
          tokens INTEGER NOT NULL,
          formatted_data TEXT NOT NULL,
          PRIMARY KEY (id),
          FOREIGN KEY (ai_table_name) REFERENCES ai_db_table (name) ON DELETE CASCADE,
          FOREIGN KEY (data_chunk) REFERENCES ai_db_data_chunk (id) ON DELETE CASCADE
      );
      ```

## Features ✨

- **Data Segmentation**: Stores data efficiently in chunks, each optimally paired with a GPT model to maximize token usage.
- **Dynamic Summarization**: Continuously refreshes data summaries in chunks, ensuring the system remains current with the latest information 🔍.
- **Scalable Querying**: Manages and retrieves data through a hierarchical system of question assigners, scaling to meet the needs of an expanding dataset 📈.
- **Token Monitoring**: Monitors and manages token allocations effectively with a dedicated 'tokens' column for DataChunks and Data tables 📊.

## Roadmap 🗺️

- **Vectorized Caching**: Aims to implement a vectorized caching system, improving response times by recognizing and leveraging similar past queries 💨.
- **Database Diversification**: To broaden database compatibility beyond Supabase.
- **LLM Expansion**: To enhance support for a wider array of Large Language Models (LLMs) beyond OpenAI GPT.
- **Similarity Search Integration**: To include a preliminary similarity search using existing data embeddings, followed by a DataChunk search if needed.

## Philosophy 🤔

AthenaDB is not just a database; it's a vision for the future of AI systems, evolving to match the expanding complexity of the data they process. With a commitment to effortless scaling and user-friendly interfaces, AthenaDB is poised to simplify intricate data interactions, making them straightforward and accessible to all.

Join our journey in forging a space where developers, innovators, and thinkers unite to pioneer transformative data interaction solutions 💪.

Stay tuned for updates, and feel free to contribute to this pioneering era of data interaction.

---

"In the spirit of Athena, who emerged fully formed from Zeus's mind, may wisdom and strength guide our creation." 🌟

---

## Contributions 🤝

Your insights and contributions are what will make AthenaDB not just functional, but exceptional. We welcome developers, writers, designers, and thinkers of all stripes to contribute to AthenaDB's growth.

## License 📄

AthenaDB is open source and available under the [MIT License](LICENSE).
