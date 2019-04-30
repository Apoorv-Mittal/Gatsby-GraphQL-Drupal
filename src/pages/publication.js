import React from "react";
import { graphql } from "gatsby";
import bibtexParse from "bibtex-parser-js";
import { Link } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";

export default class Publication extends React.Component {
  render() {
    let data = this.props.data.allNodePublication.edges;

    return (
      <Layout>
        <SEO title="Publications" />
        <h3>Publications</h3>
        {data.map((pub, index) => (
          <div key={index}>
            {bibtexParse.toJSON(pub.node.body.value).map((p, index) => (
              <div key={index}>
                {p.entryTags.TITLE +
                  ", " +
                  p.entryTags.AUTHOR +
                  ", " +
                  p.entryTags.JOURNAL +
                  ", "}
                <b>{p.entryTags.VOLUME}</b>
                {", " + p.entryTags.PAGES + ",(" + p.entryTags.YEAR + ")"}
                <br/>
                <br/>
              </div>
            ))}
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
