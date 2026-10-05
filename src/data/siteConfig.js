import rugHero from '../../görsel/106749453663888921.jpg'
import rugDetailOne from '../../görsel/pexels-abdul-rehman-malik-2161038423-37219746.jpg'
import rugDetailTwo from '../../görsel/pexels-abdul-rehman-malik-2161038423-37219747.jpg'
import rugTexture from '../../görsel/Գորգը խորհուրդ է տրվում խորը լվանալ առնվազն 1….jpg'
import blanketImage from '../../görsel/battaniye.jpg'
import curtainImage from '../../görsel/perde.jpg'
import mattressImage from '../../görsel/yatak.jpg'
import duvetImage from '../../görsel/yorgan.jpg'
import rugAfter from '../../görsel/sonrası.jpg'
import cleaningImage from '../../görsel/yikama.jpg'
import dryingImage from '../../görsel/kurutma.jpg'
import deliveryImage from '../../görsel/teslimat.jpg'

export const company = {
  name: 'UMAY HALI YIKAMA',
  city: 'Kayseri',
  district: 'Melikgazi',
  phone: '+90 506 972 38 37',
  whatsapp: '+905069723837',
  address: 'Melikgazi Mahallesi, Atatürk Bulvarı No: 18, Kayseri',
  hours: 'Her gün | 08:00 - 00:00',
  instagram: 'umayhali.38',
  website: 'https://www.umayhaliyikama.com',
  stickerImage: '',
  metaTitle: 'Umay Halı Yıkama | Kayseri Premium Halı Yıkama ve Temizlik Hizmeti',
  metaDescription:
    'Umay Halı Yıkama, Kayseri’de yaşam alanlarınıza premium temizlik ve bakım deneyimi sunan modern bir halı yıkama markasıdır.',
}

export const navItems = [
  { label: 'Hizmetler', href: '#services' },
  { label: 'Süreç', href: '#process' },
  { label: 'Hakkımızda', href: '#about' },
  { label: 'İletişim', href: '#contact' },
]

export const stats = [
  { value: '06', label: 'Ev tekstili hizmeti' },
  { value: '01', label: 'Özenli yaklaşım' },
  { value: '02', label: 'Kolay iletişim adımı' },
  { value: '∞', label: 'Detaylara dikkat' },
]

export const serviceItems = [
  {
    id: 'hali',
    number: '01',
    title: 'HALI',
    description: 'Halı dokusuna uygun profesyonel bakım ve temizlik.',
    image: 'https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'koltuk',
    number: '02',
    title: 'KOLTUK',
    description: 'Koltuk kumaşına uygun özenli temizlik uygulaması.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'yorgan',
    number: '03',
    title: 'YORGAN',
    description: 'Yorgan ve ev tekstillerinde hijyen odaklı temizlik.',
    image: duvetImage,
  },
  {
    id: 'battaniye',
    number: '04',
    title: 'BATTANİYE',
    description: 'Battaniyelerde özenli yıkama ve bakım.',
    image: blanketImage,
  },
  {
    id: 'perde',
    number: '05',
    title: 'PERDE',
    description: 'Perdelerin yapısına uygun temizlik ve bakım.',
    image: curtainImage,
  },
  {
    id: 'yatak',
    number: '06',
    title: 'YATAK',
    description: 'Yatak yüzeylerinde profesyonel temizlik.',
    image: mattressImage,
  },
]

export const processSteps = [
  { number: '01', title: 'PROFESYONEL YIKAMA', image: cleaningImage },
  { number: '02', title: 'KONTROLLÜ KURUTMA', image: dryingImage },
  { number: '03', title: 'GÜVENLİ TESLİMAT', image: deliveryImage },
]

export const testimonials = [
  {
    quote: 'Evimdeki halının bu kadar farklı görünebileceğini bilmiyordum.',
    name: 'Elif K.',
    area: 'Melikgazi',
  },
  {
    quote: 'Tüm süreç çok düzenli ve profesyoneldi. Evin havası bile değişti.',
    name: 'Murat T.',
    area: 'Kocasinan',
  },
  {
    quote: 'Halıyı teslim aldıkları gün verdiği hissi hiç unutmayacağım.',
    name: 'Sena A.',
    area: 'İldem',
  },
  {
    quote: 'Hızlı teslimat ve özenli işçilik için çok memnun kaldık.',
    name: 'Aysel Y.',
    area: 'Talas',
  },
  {
    quote: 'Temizlik sonrası salonumuz sanki yeniden doğdu. Kesinlikle tavsiye ederim.',
    name: 'Burak C.',
    area: 'Mimarsinan',
  },
]

export const galleryItems = [
  { title: 'Modern salon', image: rugHero, size: 'tall' },
  { title: 'Lif bakımı', image: rugDetailOne, size: 'wide' },
  { title: 'Özel temizlik', image: rugDetailTwo, size: 'square' },
  { title: 'Minimal yaşam', image: rugTexture, size: 'wide' },
  { title: 'Detay odaklı', image: rugHero, size: 'square' },
  { title: 'Klasik eşya', image: rugDetailOne, size: 'tall' },
]

export const instagramPosts = [
  rugHero,
  rugDetailOne,
  rugDetailTwo,
  rugTexture,
  rugHero,
  rugDetailOne,
]

export const hotspots = [
  { id: 'deep', label: 'Derinlemesine lif temizliği', x: '18%', y: '35%' },
  { id: 'stain', label: 'Özel leke uygulaması', x: '52%', y: '58%' },
  { id: 'dry', label: 'Profesyonel kurutma', x: '76%', y: '26%' },
]
