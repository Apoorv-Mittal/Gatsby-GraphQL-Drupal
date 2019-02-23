import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"

class IndexPage extends React.Component {

  render() {

    const pages = this.props.data.allNodeArticle.edges
    const pageTitles = pages.map((page, index) => 
    {
      let node = page.node
      let img = this.props.data.allImageSharp.edges.filter(i => i.node.parent.id === node.relationships.field_image.localFile.id )
      return (
        <li key ={Math.random()}>
          <Link to="/article" key ={Math.random()} state={{ node: node, image: img }}>
            {page.node.title}
          </Link>
        </li>)
    })
    return (
      <Layout>
        <ul>{pageTitles}</ul>
      </Layout>
    )
  }
}
export default IndexPage

export const query = graphql`
  query pageQuery {
    allNodeArticle {
      edges {
        node {
          title
          body {
            value
            processed
          }
          relationships {
            field_image {
              id,
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
          },
          id,
          internal {
            contentDigest
            type
            owner
          },
          parent {
            id
          }
        }
      }
    }
  }
`
