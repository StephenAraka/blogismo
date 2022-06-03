import styles from '../../styles/Slug.module.css';
import { GraphQLClient, gql } from 'graphql-request';

const graphcms = new GraphQLClient('https://api-eu-central-1.graphcms.com/v2/cl3odbzz75jbv01xicmr4333w/master');

const QUERY = gql`
query Post($slug: String!) {
  post(where: {slug: $slug}) {
    id,
    title,
    datePublished,
    slug,
    content{
      html
    },
    author{
    name,
    avatar{
      url
    }
    },
    coverPhoto{
      id,
      url
    }
  }
}
`;

const SLUGLIST = gql`
  {
    posts {
      slug
    }
  }
`;


export async function getStaticProps() {
  const { posts } = await graphcms.request(QUERY);
  return {
    props: {
      posts,
    },
    revalidate: 10
  }
}
