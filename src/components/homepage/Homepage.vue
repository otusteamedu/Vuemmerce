<template>
  <div>
    <hero></hero>
    <ads></ads>
    <news></news>
    <categories_list-container></categories_list-container>
    <recentlyViewed></recentlyViewed>
  </div>
</template>

<script>
import CategoriesListContainer from "../categories/CategoriesListContainer";
import HeroSection from "../hero/Hero";
import VmNewsList from "../news/NewsListContainer";
import ads from "../ads/ads";
import recentlyViewed from "../recently_viewed/recently_viewed";

export default {
  name: "homepage-component",
  components: {
    "categories_list-container": CategoriesListContainer,
    hero: HeroSection,
    news: VmNewsList,
    ads,
    recentlyViewed: recentlyViewed
  }
};
</script>
