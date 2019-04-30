import React from "react";
import { Link } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";

export default class People extends React.Component {
  render() {
    let userData = this.props.data.allUserUser.edges;
    let articleData = this.props.data.allNodeArticle.edges;

    articleData = articleData.map((page, index) => {
      let node = page.node;
      let img = this.props.data.allImageSharp.edges.filter(
        i => i.node.parent.id === node.relationships.field_image.localFile.id
      );
      return { article: node, image: img };
    });

    return (
      <Layout>
        <SEO title="People" />
        {userData
          .filter(user => user.node.relationships != null)
          .map((user, index) => {
            let relationships = user.node.relationships.node__article;
            let articleLinks = [];
            if (relationships) {
              for (let i = 0; i < relationships.length; i += 2) {
                let art = articleData.filter(element => element.article.title === relationships[i].title)
                articleLinks.push(
                  <div key={i}>
                    <Link to={`/article`} state={{ node: art[0].article, image: art[0].image }}>
                      {relationships[i].title}
                    </Link>
                    <br />
                  </div>
                );
              }
            }

            return (
              <div key={index}>
                <h5>{user.node.name}</h5>
                <div>Articles: {articleLinks}</div>
                <br/>
              </div>
            );
          })}
        <br />
        <Link to="/">Go back to the homepage</Link>
      </Layout>
    );
  }
}

export const query = graphql`
  query peopleQuery {
    allUserUser {
      edges {
        node {
          name
          relationships {
            node__article {
              title
            }
          }
        }
      }
    }
    allNodeArticle {
      edges {
        node {
          id
          title
          body {
            value
            processed
          }
          relationships {
            field_image {
              id
              localFile {
                id
              }
            }
          }
        }
      }
    }
    allImageSharp {
      edges {
        node {
          original {
            width
            height
            src
          }
          id
          internal {
            contentDigest
            type
            owner
          }
          parent {
            id
          }
        }
      }
    }
  }
`;
