<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\NewsRepository;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Finder\Finder;

class NewsController extends AbstractController
{
    /**
     * @var NewsRepository
     */
    protected $newsRepository;

    public function __construct(NewsRepository $newsRepository){
        $this->newsRepository = $newsRepository;
    }

    /**
     * @Route("/news", name="app_news")
     */
    public function index(): Response
    {
        return $this->render('news/index.html.twig', [
            'controller_name' => 'NewsController',
        ]);
    }

    /**
     * @Route("/news/{token}", name="app_news_item")
     */
    public function item($token): Response{
        if(!$newsItem = $this->newsRepository->findOneBy(['alias' => $token])){
            throw $this->createNotFoundException('Page not found');
        }
        $folderName = '/images/news/'.$newsItem->getAlias().'/gallery/';
        $gallery = $this->getGalleryImgs($folderName);
        $news = $this->newsRepository->findAll();

        return $this->render('news/item.html.twig',[
            'newsItem' => $newsItem,
            'gallery' => $gallery,
            'news' => $news,
        ]);
    }

    private function getGalleryImgs($folder){
        $files = array();
        $filesystem = new Filesystem();
        $finder = new Finder();
        if($filesystem->exists($_SERVER['DOCUMENT_ROOT'].$folder)){
            $finder->files()->name(['*.jpeg','*.jpg','*.png', '*.webp'])->in($_SERVER['DOCUMENT_ROOT'].$folder);
            foreach ($finder as $file){
                $files[] = $folder.$file->getFileName();
            }
        }
        return $files;
    }
}
