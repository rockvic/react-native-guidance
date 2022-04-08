import { StackScreenProps } from "@react-navigation/stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";

export type RootStackParamList = {
  Home: undefined;
  ChangeBg: undefined;
  Profile: undefined;
  CameraRoll: {
    initChoosedPhotos?: string[];
    multiple?: boolean;
    onChoosed: (photos: string[]) => void;
  };
  ChooseAlbum: {
    initAlbumName: string;
    onChoosed: (album: string) => void;
  };
  SignIn: {
    account: string;
  } | undefined;
  SignUp: {
    account: string;
  } | undefined;
  ResetPassword: {
    account: string;
  } | undefined;
  ChangePassword: undefined;

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
