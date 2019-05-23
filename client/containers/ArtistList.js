import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { StackNavigator } from "react-navigation";
import firebase from "../utils/Firestore.js";
import {
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  AsyncStorage,
  Animated,
  PanResponder
} from "react-native";
import * as Animatable from "react-native-animatable";

import DefaultContainer from "./DefaultContainer";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import ArtistItem from "../components/ArtistItem";
import { updateHeader } from "../utils/UpdateHeader";

import sortIcon from "../images/icons/sort_btn.png";
import findIcon from "../images/icons/find_btn.png";
import { fetchArtists } from "../services/api";

const db = firebase.firestore();
const { width, height } = Dimensions.get("window");

class ArtistList extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    const headerStyle = Object.assign(
      {},
      params.bg ? { backgroundColor: params.bg } : null
    );
    return {
      title: `${params.title || params.screen || "Artist List"}`,
      headerTitleStyle: { textAlign: "center", alignSelf: "center" },
      headerStyle
    };
  };

  static defaultProps = { fetchArtists };

  constructor(props) {
    super(props);
    this.state = {
      name: null,
      edit_name: null,
      loading: false,
      update: null,
      add: false,
      allArtists: [],
      artists: [],
      nameComplete: ""
    };
    updateHeader(this.props);
  }

  componentDidMount() {
    this.updateArtistList();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  async updateArtistList() {
    // this.setState({ loading: true });
    this.unsubscribe = db.collection("artists").onSnapshot(querySnapshot => {
      const artists = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        _id: doc.id
      }));
      this.setState({
        allArtists: artists,
        artists,
        loading: false,
        update: false,
        add: false,
        name: "",
        showSearch: false
      });
    });
  }

  toggleSearch = () => {
    this.setState({ showSearch: !this.state.showSearch });
  };

  search = text => {
    const filtered =
      this.state.allArtists.filter(
        v => v.name.toLowerCase().indexOf(text.toLowerCase()) > -1
      ) || !text;

    this.setState({
      artists: filtered.length ? filtered : this.state.allArtists
    });
  };

  showSetList = artist => () => {
    // console.log('showSetList artist', artist);
    const { navigate } = this.props.navigation;
    navigate("SetList", { name: "SetList", artist });
  };

  home = () => this.props.navigation.navigate("Options");

  renderHeaderChildren() {
    return (
      <Fragment>
        <View style={styles.icons}>
          <TouchableOpacity>
            <Image style={styles.icon} source={sortIcon} resizeMode={"cover"} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.toggleSearch}>
            <Image style={styles.icon} source={findIcon} resizeMode={"cover"} />
          </TouchableOpacity>
        </View>
        <AppText textStyle={[styles.text]}>ARTIST LIST</AppText>
      </Fragment>
    );
  }

  render() {
    const { showSearch } = this.state;
    return (
      <DefaultContainer
        loading={this.state.loading}
        headerChildren={this.renderHeaderChildren()}
        navigation={this.props.navigation}
      >
        {showSearch && (
          <AppTextInput
            placeholder="Start typing"
            onChangeText={this.search}
            value=""
          />
        )}
        <ScrollView style={styles.scroll} pagingEnabled={true}>
          {this.state.artists.map((artist, i) => {
            return (
              <ArtistItem
                key={i}
                artist={artist}
                showSetList={this.showSetList(artist)}
              />
            );
          })}
        </ScrollView>
      </DefaultContainer>
    );
  }
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    marginTop: 60
  },
  icon: {
    width: 30,
    height: 30
  },
  icons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 65
  },
  text: {
    // textAlign: 'right',
    color: "white",
    fontSize: 17,
    fontFamily: "montserrat-regular"
  }
});

const mapStateToProps = state => ({
  authorized: state.login.authorized
});
export default connect(mapStateToProps)(ArtistList);
