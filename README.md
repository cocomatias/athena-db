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

3. Set up your environment variables by creating an `.env` file based on the provided [.env.example](.env.example).
   <br>

   > **Note:** You will need to create a [Supabase](https://supabase.io/) account and database to store your data. If you have problems finding the SUPABASE_CONNECTION_STRING, you can find it in `Project Settings > Database > Connection Pooling Custom Configuration > Connection string`. You have to save the Supabase Database Password and replace `[YOUR-PASSWORD]` from the connection string with it.

4. Fire up the development server:

   ```bash
   yarn dev
   ```

5. Run the endpoint "`http://localhost:3000/setup-supabase`" to create the necessary tables in your Supabase database.

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
- **Image Support**: To support image data in addition to text data. The idea is to use `gpt-4-vision` to let users also search images with queries.
- **Question Assigner Expansion**: Every Question Assigner receives as many DataChunk summaries as possible, but if there are too many, it will create a new Question Assigner and split the summaries between them. This process will be repeated until there are no more summaries to split.
- **RealTime Data**: To support real-time data updates. We can skip the summarization from the DataChunks, and send the user question to all the available DataChunks, also skipping the Question Assigners. This will be useful for data that is constantly changing, like stock prices.
- **General Tables Search**: For every AI Table, create a Summary of the DataChunk Summaries. This way, AtlasDB will only have a 'query' param without the need of explicity say what AI Table you want to search on. We can also pass the 'ai_db_table' to narrow the search

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
