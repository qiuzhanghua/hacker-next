import * as React from "react";
import fetch from "isomorphic-fetch";
import Error from "next/error";
import Link from "next/link";
import StoryList from "../components/StoryList";
import Layout from "../components/Layout";

class Index extends React.Component {
    static async getInitialProps({req, res, query}) {
        let stories;
        let page;

        try {
            page = Number(query.page) || 1;
            const response = await fetch(`https://node-hnapi.herokuapp.com/news?page=${page}`);
            stories = await response.json();
       } catch (err) {
            console.log(err);
            stories = [];
        }
        return {page, stories}
    }

    render() {
        const {page, stories} = this.props;
        if (stories.length === 0) {
            return <Error statusCode={503} />
        }
        return (
            <Layout title={"Hacker Next"} description="A Hacker new clone with Next.js">
                <StoryList stories={stories} />
                <footer>
                    <Link href={`/?page=${page + 1}`}>
                        <a>Next Page ({page + 1})</a>
                    </Link>
                </footer>
                <style jsx>{`
                  footer {
                    padding: 1rem;
                  }
                  footer a {
                    font-weight: bold;
                    color: black;
                    text-decoration: none;
                  }
                `}</style>
            </Layout>
        )
    }
}

export default Index;
