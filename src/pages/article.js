import React from "react";
import { Link } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";

export class Article extends React.Component {
  render() {
    let image = this.props.location.state.image[0].node.original.src;
    let node = this.props.location.state.node;

    return (
      <Layout>
        <SEO title={node.title} />
        <h1>{node.title}</h1>
        <img src={image} alt="this is a recipe" style={{ width: "100%" }} />
        <article dangerouslySetInnerHTML={{ __html: node.body.value }} />
        <br />
        <Link to="/">Go back to the homepage</Link>
      </Layout>
    );
  }
}

export default Article;
