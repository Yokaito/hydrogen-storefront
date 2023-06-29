import {render, screen} from '@testing-library/react';

import Home, {loader} from '~/routes/($locale)._index';

jest.mock('@remix-run/react', () => ({
  useLoaderData: () => ({
    shop: {
      name: 'Title',
      description: 'Description',
    },
  }),
}));

describe('loader home', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('render home with name and description of the shop', async () => {
    render(<Home />);

    expect(screen.getByRole('heading')).toHaveTextContent('Title');
    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  it('loader home should throw 404 error', async () => {
    const response = await loader({
      params: {
        locale: 'EN-CA',
      },
      context: {
        storefront: {
          i18n: {
            language: 'EN',
            country: 'US',
          },
        },
      },
    } as any).catch((error) => error);

    expect(response.status).toBe(404);
  });

  it('loader return data shop with name and description', async () => {
    const response = await loader({
      params: {
        locale: 'EN-US',
      },
      context: {
        storefront: {
          query: async () => ({
            shop: {
              name: 'Title',
              description: 'Description',
            },
          }),
          i18n: {
            language: 'EN',
            country: 'US',
          },
        },
      },
    } as any);

    expect(response.data).toEqual({
      shop: {
        name: 'Title',
        description: 'Description',
      },
    });
  });
});
