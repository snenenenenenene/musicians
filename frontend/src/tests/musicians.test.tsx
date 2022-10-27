import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { RecommendedBands } from '../components/home.components/recommended-bands.component';
import { Home } from '../pages';
import { NewBand } from '../pages/bands-new.page';
import getBands from '../services/api-calls';
import { GlobalContext } from '../services/store';
const queryClient = new QueryClient();

export const wrapper = ({ children }) => {
  return (
    <GlobalContext.Provider value={{ user: { id: 1 } }}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </BrowserRouter>
    </GlobalContext.Provider>
  );
};
describe('Musicians', () => {
  it('fetch musicians when creating a band', async () => {
    // render(<wrapper children={<Home />} />);
    // expect(await screen.findByText('New Band')).toBeInTheDocument();
  });

  it('fetch musicians on home page', async () => {
    const bandData = getBands();

    render(
      <GlobalContext.Provider value={{ user: { id: 1 } }}>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <RecommendedBands />
          </QueryClientProvider>
        </BrowserRouter>
      </GlobalContext.Provider>
    );
    const spy = jest.spyOn(global, 'fetch');
    await waitFor(() => expect(spy).toHaveBeenCalledTimes(1));
    expect(await screen.findByText('Artists')).toBeInTheDocument();
    // expect(await screen.getAllByText('Gengahr')).toBeInTheDocument();
    expect(bandData).toBeTruthy();
  });
});
