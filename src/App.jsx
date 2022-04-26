import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./Layout/Layout";
import { GameListScreen, GameScreen, HomeScreen, ProfileScreen, GamePlayScreen, GameSearchScreen, UnderConstructionScreen } from "./Pages";
import "./i18n/i18Next";
import { Provider } from "react-redux";
import { store } from "./store/store";
import ScrollToTop from "./Layout/ScrollToTop";
import { Collection } from "./Pages/Collection/Collection";
import "./app.css";
import { Profile } from "./Pages/DevProfile/Profile";
import { SingleNFT } from "./Pages/SingleNFT/SingleNFT";

function App() {
  return (
      <Provider store={store}>
        <BrowserRouter>
          <ScrollToTop>
            <Routes>
              <Route path="/" element={<Layout/>}>
                <Route index element={<HomeScreen/>}/>
                <Route path="collection" element={<Collection/>}/>
                 <Route path="collection/:id" element={<Collection/>}/>
                <Route path="collection/single-nft/:id" element={<SingleNFT/>}/>
                <Route path="profile" element={<Profile />} />
           */} <Route path="single-nft/:collectionId/:nftId" element={<SingleNFT/>}/>
                <Route path="games" element={<GameListScreen/>}/>
                <Route path="search" element={<GameSearchScreen/>}/>
                <Route path="games/:id" element={<GameScreen/>}/>
                <Route path="games/:id/play" element={<GamePlayScreen/>}/>
                {/*<Route path="profile" element={<ProfileScreen/>}/>*/}
                <Route path="swap" element={<UnderConstructionScreen/>}/>
                <Route path="staking" element={<UnderConstructionScreen/>}/>
                <Route path="marketplace" element={<UnderConstructionScreen/>}/>
                <Route path="*" element={<Navigate to="/"/>}/>
              </Route>
            </Routes>
          </ScrollToTop>
        </BrowserRouter>
      </Provider>
  );
}

export default App;
