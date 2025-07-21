import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { IconComponent } from 'atlas-icon';
import { IconCollectionGalleryComponent } from './icon-collection-gallery.component';

const iconCollections = [
  'display-blue',
  'display-green',
  'display-green-reverse',
  'display-pink',
  'display-pink-reverse',
  'display-purple',
  'display-purple-reverse',
  'display-white-reverse',
  'accessibility',
  'animals-nature',
  'arrows',
  'business-finance',
  'clothes-accessories',
  'design-development',
  'emoticons',
  'energy-environment',
  'entertainment',
  'family-kids',
  'files-folders',
  'food',
  'gaming',
  'healthcare',
  'holidays',
  'home-buildings',
  'maps-locations',
  'military-war',
  'multimedia',
  'real-estate',
  'romance',
  'schools-education',
  'shopping',
  'signs-symbols',
  'sport',
  'technology',
  'text-editing',
  'transportation',
  'travel',
  'user-interface',
  'users',
  'weather',
  'accessibility-solid',
  'animals-nature-solid',
  'arrows-solid',
  'business-finance-solid',
  'clothes-accessories-solid',
  'design-development-solid',
  'emoticons-solid',
  'energy-environment-solid',
  'entertainment-solid',
  'family-kids-solid',
  'files-folders-solid',
  'food-solid',
  'gaming-solid',
  'healthcare-solid',
  'holidays-solid',
  'home-buildings-solid',
  'maps-locations-solid',
  'military-war-solid',
  'multimedia-solid',
  'real-estate-solid',
  'romance-solid',
  'schools-education-solid',
  'shopping-solid',
  'signs-symbols-solid',
  'sport-solid',
  'technology-solid',
  'text-editing-solid',
  'transportation-solid',
  'travel-solid',
  'user-interface-solid',
  'users-solid',
  'weather-solid',
  'flags',
  'logos',
  'payment-methods',
];
let allIcons = [];
iconCollections.forEach(fileName => {
  const icons = JSON.parse(localStorage.getItem(fileName)) || [];
  // If icons are objects, adjust accordingly
  allIcons = allIcons.concat(icons.map(icon => ({ icon, collection: fileName })));
});


export default {
  title: 'Adopters/Design/Icons/All',
  component: IconCollectionGalleryComponent,
  decorators: [
    moduleMetadata({
      declarations: [IconComponent, IconCollectionGalleryComponent],
      imports: [FormsModule],
    }),
  ],
} as Meta;

export const Gallery: Story = () => ({
  props: {
    icons: allIcons,
  },
});