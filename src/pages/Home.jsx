import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const Home = () => {
  const { t, language } = useLanguage();
  return (
    <div className="bg-gradient-to-br from-coffee-50 to-coffee-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-coffee-900 mb-6 font-khmer">
            {t('welcomeTo')} {t('brandName')}
          </h1>
          <p className="text-xl text-coffee-700 mb-8 max-w-2xl mx-auto font-khmer">
            {language === 'km' 
              ? 'រកឃើញការជ្រើសរើសកាហ្វេគុណភាពខ្ពស់របស់យើង នំផ្លែឈើ និងផលិតផលផ្សេងៗទៀត។ មានបទពិសោធន៍នៃការលាយបញ្ចូលគ្នាយ៉ាងល្អឥតខ្ចោះរវាងគុណភាព និងភាពងាយស្រួល។'
              : 'Discover our premium selection of coffees, pastries, and more. Experience the perfect blend of quality and comfort.'
            }
          </p>
          <div className="space-x-4">
            <Link
              to="/menu"
              className="bg-coffee-600 hover:bg-coffee-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
            >
              {t('viewMenu')}
            </Link>
            <Link
              to="/register"
              className="bg-white hover:bg-coffee-50 text-coffee-600 font-bold py-3 px-6 rounded-lg border-2 border-coffee-600 transition duration-300"
            >
              {t('signUp')}
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">☕</div>
            <h3 className="text-xl font-semibold text-coffee-800 mb-2 font-khmer">
              {language === 'km' ? 'កាហ្វេគុណភាពខ្ពស់' : 'Premium Coffee'}
            </h3>
            <p className="text-coffee-600">
              {language === 'km' 
                ? 'មកពីគ្រាប់កាហ្វេដ៏ល្អបំផុតនៅជុំវិញពិភពលោក ដុតឱ្យបានយ៉ាងល្អឥតខ្ចោះ។'
                : 'Sourced from the finest coffee beans around the world, roasted to perfection.'
              }
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">🥐</div>
            <h3 className="text-xl font-semibold text-coffee-800 mb-2 font-khmer">
              {language === 'km' ? 'នំផ្លែឈើស្រស់' : 'Fresh Pastries'}
            </h3>
            <p className="text-coffee-600">
              {language === 'km' 
                ? 'ទំនិញដែលធ្វើដោយថ្មីប្រចាំថ្ងៃ ដែលត្រូវគ្នាយ៉ាងល្អជាមួយកាហ្វេដែលអ្នកចូលចិត្ត។'
                : 'Daily fresh baked goods that pair perfectly with your favorite coffee.'
              }
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold text-coffee-800 mb-2 font-khmer">
              {language === 'km' ? 'សេវាកម្មរហ័ស' : 'Quick Service'}
            </h3>
            <p className="text-coffee-600">
              {language === 'km' 
                ? 'បញ្ជាទិញតាមអ៊ីនធឺណិត ហើយមកទទួលយកអ្វីដែលអ្នកចូលចិត្តដោយមិនចាំបាច់រង់ចាំ។'
                : 'Order online and pick up your favorites without the wait.'
              }
            </p>
          </div>
        </div>

        <div className="mt-20 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-coffee-900 mb-6 text-center font-khmer">
            {language === 'km' ? 'ហេតុអ្វីត្រូវជ្រើសរើសយើង?' : 'Why Choose Us?'}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <span className="text-2xl">🌟</span>
              <div>
                <h3 className="font-semibold text-coffee-800 mb-2 font-khmer">
                  {language === 'km' ? 'គ្រឿងផ្សំគុណភាពខ្ពស់' : 'Quality Ingredients'}
                </h3>
                <p className="text-coffee-600">
                  {language === 'km' 
                    ? 'យើងប្រើតែគ្រឿងផ្សំដ៏ល្អបំផុតដើម្បីធានាថាការ៉េគ្រប់ពែងល្អឥតខ្ចោះ។'
                    : 'We use only the finest ingredients to ensure every cup is perfect.'
                  }
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <span className="text-2xl">💚</span>
              <div>
                <h3 className="font-semibold text-coffee-800 mb-2 font-khmer">
                  {language === 'km' ? 'មិត្តភាពបរិស្ថាន' : 'Eco-Friendly'}
                </h3>
                <p className="text-coffee-600">
                  {language === 'km' 
                    ? 'អនុវត្តន៍ប្រកបដោយនិរន្តរភាព និងការវេចខ្ចប់ដែលអាចបំបែកបានជាជីវជាតិ។'
                    : 'Sustainable practices and biodegradable packaging.'
                  }
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <span className="text-2xl">👥</span>
              <div>
                <h3 className="font-semibold text-coffee-800 mb-2 font-khmer">
                  {language === 'km' ? 'អ្នកធ្វើកាហ្វេជំនាញ' : 'Expert Baristas'}
                </h3>
                <p className="text-coffee-600">
                  {language === 'km' 
                    ? 'អ្នកជំនាញដែលបានបណ្តុះបណ្តាល ដែលផលិតភេសជ្ជៈគ្រប់ប្រភេទដោយការថែរក្សាយ៉ាងយកចិត្តទុកដាក់។'
                    : 'Trained professionals who craft every drink with care.'
                  }
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <span className="text-2xl">🎁</span>
              <div>
                <h3 className="font-semibold text-coffee-800 mb-2 font-khmer">
                  {language === 'km' ? 'រង្វាន់អត្ថាធិប្បាយ' : 'Loyalty Rewards'}
                </h3>
                <p className="text-coffee-600">
                  {language === 'km' 
                    ? '�កពិន្ទុជាមួយការទិញគ្រប់លើក ហើយទទួលបានការផ្តល់ជូនពិសេសៗ។'
                    : 'Earn points with every purchase and get exclusive deals.'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-coffee-900 mb-8 font-khmer">
            {language === 'km' ? 'ត្រៀមបញ្ជាទិញហើយ?' : 'Ready to Order?'}
          </h2>
          <div className="space-x-4">
            <Link
              to="/menu"
              className="bg-coffee-600 hover:bg-coffee-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 inline-block"
            >
              {t('menu')}
            </Link>
            <Link
              to="/register"
              className="bg-white hover:bg-coffee-50 text-coffee-600 font-bold py-3 px-8 rounded-lg border-2 border-coffee-600 transition duration-300 inline-block"
            >
              {t('signUp')}
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
