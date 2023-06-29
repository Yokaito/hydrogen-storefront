import {render, screen} from '@testing-library/react';
import {Link} from '.';
import {unstable_createRemixStub} from '@remix-run/testing';
import {useMatches} from '@remix-run/react';

jest.mock('@remix-run/react', () => ({
  ...jest.requireActual('@remix-run/react'),
  useMatches: jest.fn(() => [
    {
      id: 0,
      pathname: '/',
      params: {},
      data: undefined,
      handle: undefined,
    },
  ]),
}));

const mockUseMatches = useMatches as jest.MockedFunction<typeof useMatches>;

describe('Link', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const makeSut = (element: JSX.Element) => {
    const RemixStub = unstable_createRemixStub([
      {
        path: '/',
        element,
      },
    ]);

    return {RemixStub};
  };

  test('should render without any errors', () => {
    const {RemixStub} = makeSut(<Link to="/">Home</Link>);

    render(<RemixStub />);

    expect(screen.getAllByRole('link').length).toBeGreaterThan(0);
  });

  test('should render when pass a function in className', () => {
    const {RemixStub} = makeSut(<Link to="/" className={() => 'test'} />);

    render(<RemixStub />);

    expect(screen.getAllByRole('link').length).toBeGreaterThan(0);
  });

  test('should render with locale', () => {
    mockUseMatches.mockReturnValueOnce([
      {
        id: '0',
        pathname: '/',
        params: {},
        data: {
          selectedLocale: {
            pathPrefix: '/pt-br',
          },
        },
        handle: undefined,
      },
    ]);

    const {RemixStub} = makeSut(<Link to="/" />);

    render(<RemixStub />);

    expect(screen.getAllByRole('link').length).toBeGreaterThan(0);
  });
});
