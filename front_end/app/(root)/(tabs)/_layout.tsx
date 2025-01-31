import icons from '@/constants/icons'
import { Tabs } from 'expo-router'
import { View, Image } from 'react-native'

const TabIcon = ({icon, color, focused}:any) => {
    return(
        <View>
            <Image
                source={icon}
                resizeMode="contain"
                tintColor={color}
                className="w-6 h-6"
            />
        </View>
    )
}
export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#39c0fb', tabBarShowLabel: false }}>
        <Tabs.Screen
        name="new-connection"
        options={{
          title: 'Connections',
          headerShown: false,
          tabBarIcon: ({color, focused}: any) => (
            <TabIcon
            icon={icons.group}
            color={color}
            name="new-connection"
            focused={focused}
            />
          )
        }}/>
        <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({color, focused}: any) => (
            <TabIcon
            icon={icons.user}
            color={color}
            name="profile"
            focused={focused}
            />
          )
        }}/>
        <Tabs.Screen
        name="chat/prepare-connection"
        options={{
          headerShown: false,
          href: null
        }}/>
    </Tabs>
  );
}
