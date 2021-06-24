import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

const flexStyle = {
  display: "flex",
  flexWrap: "wrap",
  padding: "1rem",
  margin: "3rem",
  justifyContent: "center",
};

const dateStyle = {
  backgroundColor: "#ffffffdb",
  width: "auto",
  radius: "1rem",
  borderRadius: ".5rem",
  textAlign: "center",
  margin: "1rem"
};

const postStyle = {
  textAlign: 'center',
  width: "20rem",
  height: "20rem",
  backgroundColor: "#060606a8",
  padding: "1.5rem",
  margin: "1rem",
  borderRadius: "1.5rem",
  color: "black",
  boxShadow: "1px 1px 6px #000",
  background: "rgba(0, 0, 0, 0) linear-gradient(218.31deg, rgb(0, 122, 255) 0%, rgb(80, 164, 255) 100%) repeat scroll 0% 0%",
};

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All posts" />
        <Bio />
        <section style={flexStyle}>
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            
              <div style={postStyle} key={node.fields.slug}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none`, color: 'black' }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <p style={dateStyle}>{node.frontmatter.date}</p>
              <p
                
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </div>
            
            
          )
        })}
        </section>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
