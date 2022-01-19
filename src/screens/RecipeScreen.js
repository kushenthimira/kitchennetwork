import React, { useRef } from "react";
import {
  ScrollView,
  Text,
  Image,
  Dimensions,
  TouchableHighlight,
  StyleSheet,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { Button } from "react-native-paper";
import { getCategoryName, getCategoryById } from "../data/MockDataAPI";
import { Icon, View } from "../components";
import { Colors } from "../config";

const { width: viewportWidth } = Dimensions.get("window");

export default function RecipeScreen(props) {
  const { navigation, route } = props;

  const item = route.params?.item;
  const category = getCategoryById(item.categoryId);
  const title = getCategoryName(category.id);

  const slider1Ref = useRef();

  const renderImage = ({ item }) => (
    <TouchableHighlight>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: item }} />
      </View>
    </TouchableHighlight>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.carouselContainer}>
        <View style={styles.carousel}>
          <Carousel
            ref={slider1Ref}
            data={item.photosArray}
            renderItem={renderImage}
            sliderWidth={viewportWidth}
            itemWidth={viewportWidth}
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
            firstItem={0}
            loop={false}
            autoplay={false}
            autoplayDelay={500}
            autoplayInterval={3000}
          />
        </View>
      </View>
      <View style={styles.infoRecipeContainer}>
        <Text style={styles.infoRecipeName}>{item.title}</Text>
        <Button
          style={{ borderRadius: 10, margin: "1%" }}
          mode="text"
          onPress={() =>
            navigation.navigate("RecipesList", { category, title })
          }
        >
          {getCategoryName(item.categoryId)}
        </Button>

        <View style={styles.infoContainer}>
          <Icon name="timer" size={24} color="black"></Icon>

          <Text style={styles.infoRecipe}>{item.time} minutes </Text>
        </View>
        <Button
          style={{
            padding: "2%",
            borderRadius: 10,
            margin: "3%",
            borderColor: Colors.primary,
          }}
          mode="outlined"
          onPress={() => {
            let ingredients = item.ingredients;
            let title = "Ingredients for " + item.title;
            navigation.navigate("IngredientsDetails", { ingredients, title });
          }}
        >
          View Ingredients
        </Button>
        <View style={styles.infoContainer}>
          <Text style={styles.infoDescriptionRecipe}>{item.description}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  carouselContainer: {
    minHeight: 250,
  },
  carousel: {},

  image: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: 250,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    width: viewportWidth,
    height: 250,
  },
  paginationContainer: {
    flex: 1,
    position: "absolute",
    alignSelf: "center",
    paddingVertical: 8,
    marginTop: 200,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 0,
  },
  infoRecipeContainer: {
    marginTop: "2%",
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  infoPhoto: {
    height: 20,
    width: 20,
    marginRight: 0,
  },
  infoRecipe: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 5,
  },
  category: {
    fontSize: 14,
    fontWeight: "bold",
    margin: 10,
    color: "#2cd18a",
  },
  infoDescriptionRecipe: {
    textAlign: "left",
    fontSize: 16,
    marginTop: 30,
    margin: 15,
  },
  infoRecipeName: {
    fontSize: 28,

    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
});