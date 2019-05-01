import React from "react";
import { graphql } from "gatsby";
import { Link } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";


export default ({ data: { allNodeArticle: {edges: article} }, pageContext: {imageId: img} }) => {
    let node = article[0].node
    return (
        <Layout>
            <SEO title={node.title} />
            <h1>{node.title}</h1>
            <img src={img} alt={`${node.title} banner`} style={{ width: "100%" }} />
            <article dangerouslySetInnerHTML={{ __html: node.body.value }} />
            <br />
            <Link to="/">Go back to the homepage</Link>
        </Layout>
    );
};

// we can query the needed category according to the id passed in the
// context property of createPage() in gatsby-node.js
export const query = graphql`
query CategoryQuery($id: String!) {
        allNodeArticle(filter: {id: {eq: $id}}) {
            edges {
                node {
                    id
                    title
                    body {
                        value
                        processed
                    }
                }
            }
        }
    }
`;