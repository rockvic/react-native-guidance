import { StackScreenProps } from "@react-navigation/stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";

export type RootStackParamList = {
  Home: undefined;
  ChangeBg: undefined;
  CameraRoll: undefined;
  ChooseAlbum: {
    onChoosed: (album: string) => void;
    initAlbumName: string;
  };

  Test: { from: string } | undefined;
  Test1: { from: string } | undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = 
  StackScreenProps<RootStackParamList, T>;

export type HomeTabParamList = {
  TurorialTab: undefined;
  SearchTab: undefined;
  MeTab: undefined;
};

export type HomeTabScreenProps<T extends keyof HomeTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<HomeTabParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
