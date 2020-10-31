import { useState, useCallback } from "react";
import { SettingsContextType } from "../contexts/settings";
import { getSettings as getSettingsDAO, updateSettings as updateSettingsDAO } from "../daos/settings-dao";
import { SettingsItemProps } from "../types/settings";

export function useSettingsContext(): SettingsContextType {
  const [settings, setSettings] = useState<SettingsItemProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // const fetchPosts = useCallback(() => {
  //   setIsLoading(true);
  //   fetch('https://jsonplaceholder.typicode.com/posts')
  //     .then(response => response.json())
  //     .then((fetchedPosts) => {
  //       setPosts(fetchedPosts);
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     })
  // }, [setPosts]);

  const fetchSettings = useCallback(() => {
    setIsLoading(true);
    getSettingsDAO(getSettingCallback);
  }, [])

  const getSettingCallback = (result: SettingsItemProps[]) => {
    setSettings(result)
    console.log(result);
    setIsLoading(false);
  };

  const updateSettings = useCallback((settings: SettingsItemProps) => {
    setIsLoading(true);
    updateSettingsDAO(settings, updateSettingsCallback);
  }, [])

  const updateSettingsCallback = (result: SettingsItemProps[]) => {
    setSettings(result)
    console.log(result);
    setIsLoading(false);
  };

  // const removePost = useCallback((postId: number) => {
  //   setIsLoading(true);
  //   fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
  //     method: 'DELETE'
  //   })
  //     .then(() => {
  //       const newPosts = [...posts];
  //       const removedPostIndex = newPosts.findIndex(post => post.id === postId);
  //       if (removedPostIndex > -1) {
  //         newPosts.splice(removedPostIndex, 1);
  //       }
  //       setPosts(newPosts);
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     })
  // }, [setPosts, posts]);

  return {
    settings,
    isLoading,
    fetchSettings,
    updateSettings
    // removePost
  }
}