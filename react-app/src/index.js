import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import { SubmittedProvider } from './components/context/SubmittedContext';
import { ModalProvider } from './components/context/Modal';
import { CreateBoardModalProvider } from './components/context/CreateBoardModal';
import { EditBoardModalProvider } from './components/context/EditBoardModal';
import { CardDetailModalProvider } from './components/context/CardDetailsModal';
import { DeleteBoardModalProvider } from './components/context/DeleteBoardModal';
import { DeleteListModalProvider } from './components/context/DeleteListModal';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <SubmittedProvider>
        <ModalProvider>
          <CreateBoardModalProvider>
            <EditBoardModalProvider>
              <DeleteBoardModalProvider>
                <DeleteListModalProvider>
                  <CardDetailModalProvider>
                    <App />
                  </CardDetailModalProvider>
                </DeleteListModalProvider>
              </DeleteBoardModalProvider>
            </EditBoardModalProvider>
          </CreateBoardModalProvider>
        </ModalProvider>
      </SubmittedProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
