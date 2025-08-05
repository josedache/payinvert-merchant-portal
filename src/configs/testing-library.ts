import {
  render,
  queries,
  within,
  waitFor,
  waitForElementToBeRemoved,
  RenderOptions,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { server } from "configs/msw-server";
import TestingProvider from "providers/TestingProvider";
import { ReactElement } from "react";

const allQueries = { ...queries };

const customScreen = within(document.body, allQueries);

function customWithin(element: HTMLBRElement) {
  return within(element, allQueries);
}

function customRender(
  ui: ReactElement,
  options?: Omit< RenderOptions<any, HTMLElement, HTMLElement>, 'queries'>
) {
  return {
    server,
    user: userEvent.setup(),
    ...render(ui, {
      wrapper: TestingProvider,
      queries: allQueries,
      ...options,
    }),
  };
}



export {
  waitFor,
  waitForElementToBeRemoved,
  server,
  userEvent,
  customScreen as screen,
  customWithin as within,
  customRender as render,
};

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
