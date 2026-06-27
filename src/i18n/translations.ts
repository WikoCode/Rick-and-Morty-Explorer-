// Simple, dependency-free i18n dictionary.
// Two languages: English (en) and Georgian (ka).

export type Language = 'en' | 'ka';

export const translations = {
  en: {
    'nav.home': 'Home',
    'nav.characters': 'Characters',
    'nav.episodes': 'Episodes',
    'nav.favorites': 'Favorites',
    'nav.brand': 'Rick & Morty Explorer',

    'home.tagline': 'Explore the multiverse',
    'home.title': 'Dive into the world of Rick & Morty',
    'home.subtitle':
      'Browse every character and episode, search across dimensions, and save your favorites — powered by the public Rick & Morty API.',
    'home.cta.characters': 'Browse Characters',
    'home.cta.episodes': 'View Episodes',
    'home.feature1.title': 'Hundreds of Characters',
    'home.feature1.text': 'Search and filter the full cast by name, status and gender.',
    'home.feature2.title': 'Every Episode',
    'home.feature2.text': 'All seasons with air dates and featured characters.',
    'home.feature3.title': 'Save Favorites',
    'home.feature3.text': 'Your picks are stored locally and stay between visits.',

    'characters.title': 'Characters',
    'characters.search': 'Search by name...',
    'characters.filter.status': 'Status',
    'characters.filter.gender': 'Gender',
    'characters.filter.all': 'All',
    'characters.empty': 'No characters match your search.',
    'characters.results': 'results',

    'episodes.title': 'Episodes',
    'episodes.aired': 'Aired',
    'episodes.cast': 'Featured cast',

    'favorites.title': 'Your Favorites',
    'favorites.empty': 'You have no favorites yet. Tap the heart on a character to save them.',
    'favorites.count': 'saved',

    'detail.back': 'Back',
    'detail.status': 'Status',
    'detail.species': 'Species',
    'detail.gender': 'Gender',
    'detail.origin': 'Origin',
    'detail.location': 'Last known location',
    'detail.episodes': 'Appears in episodes',

    'status.Alive': 'Alive',
    'status.Dead': 'Dead',
    'status.unknown': 'Unknown',
    'gender.Female': 'Female',
    'gender.Male': 'Male',
    'gender.Genderless': 'Genderless',
    'gender.unknown': 'Unknown',

    'common.loading': 'Loading...',
    'common.error': 'Something went wrong. Please try again.',
    'common.retry': 'Retry',
    'common.prev': 'Previous',
    'common.next': 'Next',
    'common.page': 'Page',
    'common.of': 'of',
    'common.viewDetails': 'View details',
    'common.addFavorite': 'Add to favorites',
    'common.removeFavorite': 'Remove from favorites',

    'notfound.title': 'Lost in another dimension',
    'notfound.text': 'The page you are looking for does not exist.',
    'notfound.cta': 'Go home',

    'footer.built': 'Built with React, TypeScript & SCSS',
    'footer.data': 'Data from the Rick and Morty API',
  },
  ka: {
    'nav.home': 'მთავარი',
    'nav.characters': 'პერსონაჟები',
    'nav.episodes': 'ეპიზოდები',
    'nav.favorites': 'რჩეულები',
    'nav.brand': 'Rick & Morty Explorer',

    'home.tagline': 'აღმოაჩინე მულტისამყარო',
    'home.title': 'ჩაეფლე Rick & Morty-ის სამყაროში',
    'home.subtitle':
      'დაათვალიერე ყველა პერსონაჟი და ეპიზოდი, მოძებნე განზომილებებში და შეინახე რჩეულები — Rick & Morty-ის საჯარო API-ის მეშვეობით.',
    'home.cta.characters': 'პერსონაჟების ნახვა',
    'home.cta.episodes': 'ეპიზოდების ნახვა',
    'home.feature1.title': 'ასობით პერსონაჟი',
    'home.feature1.text': 'მოძებნე და გაფილტრე სახელით, სტატუსით და სქესით.',
    'home.feature2.title': 'ყველა ეპიზოდი',
    'home.feature2.text': 'ყველა სეზონი ეთერის თარიღებითა და პერსონაჟებით.',
    'home.feature3.title': 'შეინახე რჩეულები',
    'home.feature3.text': 'შენი არჩევანი ინახება ლოკალურად და რჩება ვიზიტებს შორის.',

    'characters.title': 'პერსონაჟები',
    'characters.search': 'მოძებნე სახელით...',
    'characters.filter.status': 'სტატუსი',
    'characters.filter.gender': 'სქესი',
    'characters.filter.all': 'ყველა',
    'characters.empty': 'შენს ძიებას პერსონაჟი არ ემთხვევა.',
    'characters.results': 'შედეგი',

    'episodes.title': 'ეპიზოდები',
    'episodes.aired': 'ეთერი',
    'episodes.cast': 'მონაწილე პერსონაჟები',

    'favorites.title': 'შენი რჩეულები',
    'favorites.empty': 'ჯერ რჩეული არ გაქვს. დააჭირე გულის ღილაკს პერსონაჟის შესანახად.',
    'favorites.count': 'შენახული',

    'detail.back': 'უკან',
    'detail.status': 'სტატუსი',
    'detail.species': 'სახეობა',
    'detail.gender': 'სქესი',
    'detail.origin': 'წარმოშობა',
    'detail.location': 'ბოლო ცნობილი ადგილმდებარეობა',
    'detail.episodes': 'მონაწილეობს ეპიზოდებში',

    'status.Alive': 'ცოცხალი',
    'status.Dead': 'მკვდარი',
    'status.unknown': 'უცნობი',
    'gender.Female': 'მდედრობითი',
    'gender.Male': 'მამრობითი',
    'gender.Genderless': 'უსქესო',
    'gender.unknown': 'უცნობი',

    'common.loading': 'იტვირთება...',
    'common.error': 'რაღაც ვერ მოხერხდა. სცადე თავიდან.',
    'common.retry': 'თავიდან ცდა',
    'common.prev': 'წინა',
    'common.next': 'შემდეგი',
    'common.page': 'გვერდი',
    'common.of': '/',
    'common.viewDetails': 'დეტალების ნახვა',
    'common.addFavorite': 'რჩეულებში დამატება',
    'common.removeFavorite': 'რჩეულებიდან ამოღება',

    'notfound.title': 'დაკარგული სხვა განზომილებაში',
    'notfound.text': 'გვერდი, რომელსაც ეძებ, არ არსებობს.',
    'notfound.cta': 'მთავარზე დაბრუნება',

    'footer.built': 'შექმნილია React-ით, TypeScript-ითა და SCSS-ით',
    'footer.data': 'მონაცემები Rick and Morty API-დან',
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
