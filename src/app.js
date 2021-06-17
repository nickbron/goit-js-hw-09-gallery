const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const galleryContainer = document.querySelector(".js-gallery");
const lightboxRef = document.querySelector(".js-lightbox");
const lightboxImageRef = document.querySelector(".lightbox__image");
const lightboxOverlayRef = document.querySelector('.lightbox__overlay');
const closeButtonRef = document.querySelector('.lightbox__button');


const galleryMarkup = createGalleryItems(galleryItems);
galleryContainer.insertAdjacentHTML("beforeend", galleryMarkup);

galleryContainer.addEventListener("click", onGalleryContainerClick);


function createGalleryItems(items) {
  return items
    .map(({ preview, original, description },index) =>
    {  
      return `<li class="gallery__item">
  <a
     class="gallery__link"
     href="${original}"
   >
     <img
       class="gallery__image"
       src="${preview}"
       data-source="${original}"
       data-alt="${description}"
       data-idx="${index}"
      
     />
   </a>
 </li>`;
    })
    .join("");

}

function onGalleryContainerClick(evt) {
  const isGalleryItem = evt.target.nodeName=="IMG";
  if (!isGalleryItem) { return;  }
  onOpenModal(evt);
}

function onOpenModal(evt)
{
  evt.preventDefault();
  
  window.addEventListener('keydown', onKeyPress);
  closeButtonRef.addEventListener('click', onCloseModal, {once:true});
  lightboxOverlayRef.addEventListener('click', onCloseModal, {once:true});
  const currentImg = evt.target;
  lightboxRef.classList.add('is-open');
  lightboxImageRef.src = currentImg.dataset.source;
  lightboxImageRef.alt = currentImg.dataset.alt;
  lightboxImageRef.setAttribute('data-idx', currentImg.dataset.idx);
   
}

function onCloseModal(evt) {
    lightboxRef.classList.remove('is-open');
    lightboxImageRef.removeAttribute('src');
  lightboxImageRef.removeAttribute('alt');
  window.removeEventListener('keydown', onKeyPress);
}

function onKeyPress(evt) {
  
  const esc = evt.code === 'Escape';
  const arrowRight = evt.code === 'ArrowRight';
  const arrowLeft = evt.code === 'ArrowLeft';
  let index;
  if (esc) {
    onCloseModal(evt);
  }

   if (arrowRight) {
   
    index = Number(lightboxImageRef.dataset.idx);
     
    if (index === galleryItems.length) {
    index = 0;
  }      
     lightboxImageRef.src = galleryItems[index].original;
     lightboxImageRef.dataset.idx = index + 1;
  }
  
  if (arrowLeft) {
     
    index = Number(lightboxImageRef.dataset.idx);
   
      if (index < 0) {
      index = galleryItems.length + index;
    }
      lightboxImageRef.src = galleryItems[index].original;
      lightboxImageRef.dataset.idx = index-1;
  }
}

