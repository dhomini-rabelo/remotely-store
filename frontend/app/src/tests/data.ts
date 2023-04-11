import { HomeProps } from '@/pages/home'

export const HomePropsData = {
  departments: [
    {
      id: '2deb7ce7-0239-4ccc-840d-06b855db5013',
      name: 'Tecnologia',
      image: '/media/departments/2023/04/ti.png',
    },
    {
      id: '544f36e3-1d5d-4c12-a7bb-9f564e6769c1',
      name: 'Marketing',
      image: '/media/departments/2023/04/marketing.png',
    },
    {
      id: '8f6921f9-7b92-4427-ac35-eb6769b6f8ac',
      name: 'Youtube',
      image: '/media/departments/2023/04/youtube_ANEXRjZ.png',
    },
    {
      id: 'ba32ceb7-e982-42d9-9221-5659b75cb236',
      name: 'Fotografia',
      image: '/media/departments/2023/04/fotografia.png',
    },
    {
      id: 'c0ac86d4-bff5-495a-8f94-3599284c53a7',
      name: 'Escritório',
      image: '/media/departments/2023/04/criatividade.png',
    },
  ],
  products: [
    {
      id: '203676a6-24e5-412c-b840-65ca3566834c',
      name: 'Headset',
      image: '/media/products/2023/04/headset.png',
      description: 'headset',
      provider: {
        id: '44aa052a-51b6-4c78-9723-d504e6e5b56a',
        name: 'Zone Electronics',
      },
      department: {
        id: '8f6921f9-7b92-4427-ac35-eb6769b6f8ac',
        name: 'Youtube',
        image: '/media/departments/2023/04/youtube_ANEXRjZ.png',
      },
      rating: 50,
      price: {
        value: 3990000,
        promotional_value: null,
      },
    },
    {
      id: '22aae230-b53c-49be-91a8-27571c79b7e8',
      name: 'Monitor',
      image: '/media/products/2023/04/monitor.png',
      description: '',
      provider: {
        id: '2711604b-1454-4e57-b211-b3eb489efd11',
        name: 'Markus Electronics',
      },
      department: {
        id: '544f36e3-1d5d-4c12-a7bb-9f564e6769c1',
        name: 'Marketing',
        image: '/media/departments/2023/04/marketing.png',
      },
      rating: 50,
      price: {
        value: 9000000,
        promotional_value: null,
      },
    },
    {
      id: '2976e282-4ff7-423b-b5d5-e916ed1d1d7b',
      name: 'HP Laptop',
      image: '/media/products/2023/03/hp-note.png',
      description: 'NOTEBOOK',
      provider: {
        id: '766aecd6-97b7-41c8-9d4a-42f4fc460d8e',
        name: 'HP',
      },
      department: {
        id: '2deb7ce7-0239-4ccc-840d-06b855db5013',
        name: 'Tecnologia',
        image: '/media/departments/2023/04/ti.png',
      },
      rating: 50,
      price: {
        value: 49000,
        promotional_value: null,
      },
    },
    {
      id: '381c9147-a93a-480d-a234-569b31c48e1e',
      name: 'Cadeira Burbun',
      image: '/media/products/2023/04/burbun-chair.png',
      description: 'cadeira burgun',
      provider: {
        id: '51dee883-e8d6-4122-8fd9-ec164fcbd430',
        name: 'Occ office',
      },
      department: {
        id: 'ba32ceb7-e982-42d9-9221-5659b75cb236',
        name: 'Fotografia',
        image: '/media/departments/2023/04/fotografia.png',
      },
      rating: 50,
      price: {
        value: 50000,
        promotional_value: 40000,
      },
    },
    {
      id: '42c8a702-dc6d-499e-9113-1603cdd1cc6b',
      name: 'Cadeira Markus',
      image: '/media/products/2023/04/markus-chair.png',
      description: '',
      provider: {
        id: '2711604b-1454-4e57-b211-b3eb489efd11',
        name: 'Markus Electronics',
      },
      department: {
        id: 'c0ac86d4-bff5-495a-8f94-3599284c53a7',
        name: 'Escritório',
        image: '/media/departments/2023/04/criatividade.png',
      },
      rating: 50,
      price: {
        value: 20000,
        promotional_value: null,
      },
    },
    {
      id: '9b6584b1-7a51-495d-83d3-51ce9ebe7ab4',
      name: 'Wireless headset',
      image: '/media/products/2023/04/wireless-headset.png',
      description: 'habdshbd',
      provider: {
        id: '2711604b-1454-4e57-b211-b3eb489efd11',
        name: 'Markus Electronics',
      },
      department: {
        id: '8f6921f9-7b92-4427-ac35-eb6769b6f8ac',
        name: 'Youtube',
        image: '/media/departments/2023/04/youtube_ANEXRjZ.png',
      },
      rating: 50,
      price: {
        value: 40000,
        promotional_value: 29000,
      },
    },
    {
      id: '9b754ff6-05b3-45f1-827d-02dd6c1784b5',
      name: 'Microfone RTH',
      image: '/media/products/2023/04/mic.png',
      description: 'dssd',
      provider: {
        id: '5bc35b6c-b743-499a-a530-fda06c7aec63',
        name: 'Huawei',
      },
      department: {
        id: '8f6921f9-7b92-4427-ac35-eb6769b6f8ac',
        name: 'Youtube',
        image: '/media/departments/2023/04/youtube_ANEXRjZ.png',
      },
      rating: 50,
      price: {
        value: 100000,
        promotional_value: null,
      },
    },
    {
      id: 'c2491952-a43b-4e6a-81cf-67be02201d5f',
      name: 'PS5',
      image: '/media/products/2023/04/ft-ps5_4Nwmm6k.png',
      description: 'ps5',
      provider: {
        id: '6cbe50d3-14ca-4a82-8210-f1ae3b5104b5',
        name: 'Sony',
      },
      department: {
        id: '2deb7ce7-0239-4ccc-840d-06b855db5013',
        name: 'Tecnologia',
        image: '/media/departments/2023/04/ti.png',
      },
      rating: 50,
      price: {
        value: 75000,
        promotional_value: null,
      },
    },
    {
      id: 'c7c7b9ff-3c8c-45c6-8717-43bc05569999',
      name: 'Hub USB',
      image: '/media/products/2023/04/usb-hub.png',
      description: 'ads',
      provider: {
        id: '44aa052a-51b6-4c78-9723-d504e6e5b56a',
        name: 'Zone Electronics',
      },
      department: {
        id: '8f6921f9-7b92-4427-ac35-eb6769b6f8ac',
        name: 'Youtube',
        image: '/media/departments/2023/04/youtube_ANEXRjZ.png',
      },
      rating: 50,
      price: {
        value: 50000,
        promotional_value: 39000,
      },
    },
    {
      id: 'd7ac5a0d-9f2f-404b-b4bf-7fede0d61c5f',
      name: 'Cadeira ajustável',
      image: '/media/products/2023/04/adjustable-chair.png',
      description: 'cadeiar ajus',
      provider: {
        id: '541e5eb2-7bb6-4452-bdab-289ef4d0fc09',
        name: 'Hughlan',
      },
      department: {
        id: 'c0ac86d4-bff5-495a-8f94-3599284c53a7',
        name: 'Escritório',
        image: '/media/departments/2023/04/criatividade.png',
      },
      rating: 50,
      price: {
        value: 30000,
        promotional_value: null,
      },
    },
    {
      id: 'da36fbcd-191e-448b-8184-27b83eff5a54',
      name: 'Cadeira Gamer',
      image: '/media/products/2023/04/cadeira-escritorio.png',
      description: 'Cadeira de escritório aconchegante',
      provider: {
        id: '541e5eb2-7bb6-4452-bdab-289ef4d0fc09',
        name: 'Hughlan',
      },
      department: {
        id: '8f6921f9-7b92-4427-ac35-eb6769b6f8ac',
        name: 'Youtube',
        image: '/media/departments/2023/04/youtube_ANEXRjZ.png',
      },
      rating: 50,
      price: {
        value: 49990,
        promotional_value: 39990,
      },
    },
    {
      id: 'ee82e7eb-4779-4a5c-8218-3b31d5af4e15',
      name: 'Mesa BHY',
      image: '/media/products/2023/04/mesa.png',
      description: 'dffdf',
      provider: {
        id: '51dee883-e8d6-4122-8fd9-ec164fcbd430',
        name: 'Occ office',
      },
      department: {
        id: '544f36e3-1d5d-4c12-a7bb-9f564e6769c1',
        name: 'Marketing',
        image: '/media/departments/2023/04/marketing.png',
      },
      rating: 50,
      price: {
        value: 30000,
        promotional_value: 25400,
      },
    },
    {
      id: 'f4079b95-1551-4ee2-80fe-7b4cc4b0d278',
      name: 'Huawei Laptop',
      image: '/media/products/2023/04/huawei-laptop.png',
      description: 'saasas',
      provider: {
        id: '5bc35b6c-b743-499a-a530-fda06c7aec63',
        name: 'Huawei',
      },
      department: {
        id: '2deb7ce7-0239-4ccc-840d-06b855db5013',
        name: 'Tecnologia',
        image: '/media/departments/2023/04/ti.png',
      },
      rating: 50,
      price: {
        value: 50000,
        promotional_value: null,
      },
    },
    {
      id: '0b9828a5-8139-4369-8947-d3cb8dc94cc8',
      name: 'Galaxy S22',
      image: '/media/products/2023/04/s2222.png',
      description: 'ps5',
      provider: {
        id: 'ebd3f5c5-10bd-480c-a9c2-71f4b3437418',
        name: 'Samsung',
      },
      department: {
        id: '2deb7ce7-0239-4ccc-840d-06b855db5013',
        name: 'Tecnologia',
        image: '/media/departments/2023/04/ti.png',
      },
      rating: 50.0,
      price: {
        value: 500000,
        promotional_value: 450000,
      },
    },
    {
      id: '32d13108-432e-4525-b9c3-8460fe0e012f',
      name: 'Smart Apple Watch SE',
      image: '/media/products/2023/03/clock-bg.png',
      description: 'Relógio da Apple',
      provider: {
        id: '425b18e6-d857-400d-a379-10e674156ca5',
        name: 'Apple',
      },
      department: {
        id: '2deb7ce7-0239-4ccc-840d-06b855db5013',
        name: 'Tecnologia',
        image: '/media/departments/2023/04/ti.png',
      },
      rating: 50.0,
      price: {
        value: 400,
        promotional_value: null,
      },
    },
  ],
  banner: [
    'da36fbcd-191e-448b-8184-27b83eff5a54',
    '0b9828a5-8139-4369-8947-d3cb8dc94cc8',
  ],
} as HomeProps
