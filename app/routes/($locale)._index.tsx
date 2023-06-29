import {useLoaderData} from '@remix-run/react';
import {LoaderArgs, defer} from '@shopify/remix-oxygen';

export const loader = async ({params, context}: LoaderArgs) => {
  const {language, country} = context.storefront.i18n;

  if (
    params.locale &&
    params.locale.toLowerCase() !== `${language}-${country}`.toLowerCase()
  ) {
    // If the locale URL param is defined, yet we still are on `EN-US`
    // the the locale param must be invalid, send to the 404 page
    throw new Response(null, {status: 404});
  }

  const data = await context.storefront.query<{
    shop: {
      name: string;
      description: string;
    };
  }>(LAYOUT_QUERY);

  return defer({
    shop: data.shop,
  });
};

const Home = () => {
  const {shop} = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>{shop.name}</h1>
      <p>{shop.description}</p>
    </div>
  );
};

export default Home;

const LAYOUT_QUERY = `#graphql
  query layout {
    shop {
      name
      description
    }
  }
`;
