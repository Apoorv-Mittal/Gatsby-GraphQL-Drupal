import React from "react";
import { Link } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";

export default class Publication extends React.Component {
  render() {
    let data = this.props.data.allNodePublication.edges;

    return (
      <Layout>
        <SEO title="Publications" />
        {data.map((pub, index) => (
          <div key={index}>
            <h5>{pub.node.title}</h5>
            <p>{pub.node.body.value}</p>
          </div>
        ))}
        <br />
        <Link to="/">Go back to the homepage</Link>
      </Layout>
    );
  }
}

export const query = graphql`
  query publicationQuery {
    allNodePublication {
      edges {
        node {
          title
          body {
            value
          }
        }
      }
    }
  }
`;
