import React from "react";
import { Link } from "gatsby";
import Layout from "../components/layout";
import {
  Card,
  CardImg,
  CardBody,
  CardText,
  CardTitle,
  Container,
  Row,
  Col
} from "reactstrap";
import { graphql } from "gatsby";

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.pages = props.data.allNodeArticle.edges;
    this.pages = this.pages.map((page, index) => {
      let node = page.node;
      let img = this.props.data.allImageSharp.edges.filter(
        i => i.node.parent.id === node.relationships.field_image.localFile.id
      );

      return { article: node, image: img };
    });
  }

  render() {
    const pages = this.pages;

    const HeroTitle = pages.slice(0, 1).map((page, index) => {
      let node = page.article;
      let img = page.image;
      return (
        <Row key={index}>
          <Col className="med-spaces clearfix">
            <section className="feature-container" key={index}>
              <div className="feature image-left">
                <div className="inner-container">
                  <Link
                    to="/article"
                    key={Math.random()}
                    state={{ node: node, image: img }}
                    className="home-link track-click"
                  >
                    <div
                      className="feature-img-container col-lg-8 no-pad-all"
                      key={index}
                    >
                      <div
                        className="feature-img"
                        style={{
                          backgroundImage: `url('${img[0].node.original.src}')`
                        }}
                      />
                    </div>
                    <div className="feature-description col-lg-4">
                      <div className="feature-content">
                        <h5 className="body-color">{node.title}</h5>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </section>
          </Col>
        </Row>
      );
    });

    const SplitRight = () => (
      <div className="col-12 col-lg-4 right">
        {pages.slice(1, 3).map((page, index) => {
          let node = page.article;
          let img = page.image;
          return (
            <Card className="w-100" key={index}>
              {img.map((hero, index) => (
                <div className="card-img-wrapper" key={index}>
                  <Link to={`/article`}>
                    <CardImg
                      top
                      width="100%"
                      src={hero.node.original.src}
                      alt="image"
                    />
                  </Link>
                </div>
              ))}

              <CardBody>
                <CardTitle>
                  <Link
                    className="body-color"
                    to={`/article`}
                  >
                    {node.title}
                  </Link>
                </CardTitle>
                <hr />
                <CardText>{node.subtitle}</CardText>
              </CardBody>
            </Card>
          );
        })}
      </div>
    );

    const PageTitles = () => {
      const grids = pages.slice(3, pages.length).map((page, index) => {
        let node = page.article;
        let img = page.image;
        return (
          <div
            className="col-sm-6 col-md-6 col-lg-3 d-flex align-items-stretch"
            key={index}
          >
            <Card className="w-100">
              <Link
                to="/article"
                key={Math.random()}
                state={{ node: node, image: img }}
                className="home-link track-click"
              >
                <div className="card-img-wrapper" key={index}>
                  <CardImg top width="100%" src={img[0].node.original.src} />
                </div>
                <CardBody>
                  <CardTitle>{node.title}</CardTitle>
                </CardBody>
              </Link>
            </Card>
          </div>
        );
      });
      return <Row>{grids}</Row>;
    };
    return (
      <Layout>
        <Container>
          {HeroTitle}
          <SplitRight/>
          <PageTitles />
        </Container>
      </Layout>
    );
  }
}
export default IndexPage;

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
