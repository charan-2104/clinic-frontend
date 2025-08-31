import React, { useState, useEffect } from 'react';
import { Play, X, Loader2, ExternalLink, Instagram, ArrowLeft, ArrowRight } from 'lucide-react';

const VideoGallery = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('featured');
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentYouTubeIndex, setCurrentYouTubeIndex] = useState(0);
  const [currentInstagramIndex, setCurrentInstagramIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Function to extract YouTube video ID from URL
  const getYouTubeVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Function to extract Instagram Reel ID from URL
  const getInstagramReelId = (url) => {
    const reelRegExp = /instagram\.com\/(?:p|reel)\/([a-zA-Z0-9_-]+)/;
    const match = url.match(reelRegExp);
    return match ? match[1] : null;
  };

  // Function to detect if URL is an Instagram Reel
  const isInstagramReel = (url) => {
    return url.includes('instagram.com') && (url.includes('/reel/') || url.includes('/p/'));
  };

  // Function to get YouTube thumbnail URL with fallbacks
  const getYouTubeThumbnail = (url, quality = 'hqdefault') => {
    const videoId = getYouTubeVideoId(url);
    return videoId ? `https://img.youtube.com/vi/${videoId}/${quality}.jpg` : null;
  };

  // Function to get Instagram embed URL
  const getInstagramEmbedUrl = (url) => {
    const reelId = getInstagramReelId(url);
    return reelId ? `https://www.instagram.com/p/${reelId}/embed/` : null;
  };

  // Function to convert YouTube URL to embed format
  const getEmbedUrl = (url) => {
    if (isInstagramReel(url)) {
      return getInstagramEmbedUrl(url);
    }
    const videoId = getYouTubeVideoId(url);
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  const fetchVideos = async () => {
    try {
      setLoading(true);
      setError(null);

      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const response = await fetch(`${API_URL}/api/videos`);
      const data = await response.json();
      
      setVideos(data);
    } catch (err) {
      console.error('Error fetching videos:', err);
      setError('Failed to load videos. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const youtubeVideos = videos.filter(video => video.videoType === 'youtube');
  const shortVideos = videos.filter(video => video.videoType === 'short');

  const handleNextYouTube = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentYouTubeIndex((prev) => 
      prev >= youtubeVideos.length - 1 ? 0 : prev + 1
    );
    
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handlePrevYouTube = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentYouTubeIndex((prev) => 
      prev <= 0 ? youtubeVideos.length - 1 : prev - 1
    );
    
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handleNextInstagram = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentInstagramIndex((prev) => 
      prev >= shortVideos.length - 2 ? 0 : prev + 1
    );
    
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handlePrevInstagram = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentInstagramIndex((prev) => 
      prev <= 0 ? shortVideos.length - 2 : prev - 1
    );
    
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const getVisibleYouTubeVideos = () => {
    if (youtubeVideos.length === 0) return [];
    return isMobile ? [youtubeVideos[currentYouTubeIndex]] : youtubeVideos;
  };

  const getVisibleInstagramVideos = () => {
    if (shortVideos.length === 0) return [];
    if (isMobile) {
      return shortVideos.slice(currentInstagramIndex, currentInstagramIndex + 2);
    }
    return shortVideos;
  };

  const openModal = (video) => {
    setSelectedVideo(video);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedVideo(null);
  };

  const VideoCard = ({ video, isShort = false }) => {
    const [thumbnailUrl, setThumbnailUrl] = useState(null);
    const [imageError, setImageError] = useState(false);
    const [thumbnailLoading, setThumbnailLoading] = useState(true);
    const [isInstagram, setIsInstagram] = useState(false);

    useEffect(() => {
      const loadThumbnail = async () => {
        setThumbnailLoading(true);
        
        if (isShort && isInstagramReel(video.url)) {
          
          setIsInstagram(true);
          setThumbnailUrl(null); 
        } else if (isShort && video.thumbnail) {
          setThumbnailUrl(video.thumbnail);
        } else {
          const youtubeThumbnail = getYouTubeThumbnail(video.url, 'hqdefault');
          setThumbnailUrl(youtubeThumbnail);
        }
        setThumbnailLoading(false);
      };
      
      loadThumbnail();
    }, [video.url, video.thumbnail, isShort]);
    
    const handleImageError = () => {
      if (!imageError) {
        if (!isShort) {
          const fallbackUrl = getYouTubeThumbnail(video.url, 'sddefault');
          if (fallbackUrl !== thumbnailUrl) {
            setThumbnailUrl(fallbackUrl);
            return;
          }
        }
      }
      setImageError(true);
    };
    
    return (
      <div 
        className={`group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ${
          isShort ? 'aspect-[9/16]' : 'aspect-video'
        }`}
        onClick={() => openModal(video)}
      >
        <div className="relative h-full">
          {thumbnailLoading ? (
            <div className="w-full h-full bg-gradient-to-br from-stone-200 to-stone-300 flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin" style={{ color: '#D4AF37' }} />
            </div>
          ) : isInstagram ? (
            <div className="w-full h-full relative overflow-hidden" style={{
              background: 'linear-gradient(135deg, #FAF9F6 0%, #FFFFF0 50%, #F5F5DC 100%)'
            }}>
              {/* Decorative background elements */}
              <div className="absolute top-0 right-0 w-20 h-20 rounded-full -translate-y-10 translate-x-10 opacity-30" style={{
                background: 'linear-gradient(135deg, #D4AF37 0%, #DCAE96 100%)'
              }}></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 rounded-full translate-y-8 -translate-x-8 opacity-20" style={{
                background: 'linear-gradient(135deg, #DCAE96 0%, #D4AF37 100%)'
              }}></div>
              
              <div className="relative z-10 h-full flex flex-col items-center justify-center p-4">
                {/* Premium Instagram icon container */}
                <div className="backdrop-blur-md rounded-2xl p-4 mb-4 shadow-xl border" style={{
                  backgroundColor: 'rgba(255, 255, 240, 0.9)',
                  borderColor: 'rgba(212, 175, 55, 0.3)'
                }}>
                  <div className="relative">
                    <Instagram className="w-10 h-10" style={{ color: '#D4AF37' }} />
                    <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full" style={{
                      background: 'linear-gradient(135deg, #D4AF37 0%, #DCAE96 100%)'
                    }}></div>
                  </div>
                </div>
                
                {/* Video title */}
                <h3 className="font-bold text-center text-sm mb-3 font-serif line-clamp-2 px-2" style={{ color: '#333333' }}>
                  {video.title}
                </h3>
                
                {/* Premium badge */}
                <div className="backdrop-blur-md rounded-full px-3 py-1.5 shadow-lg border" style={{
                  backgroundColor: 'rgba(212, 175, 55, 0.1)',
                  borderColor: 'rgba(212, 175, 55, 0.3)'
                }}>
                  <p className="text-xs font-semibold" style={{ color: '#D4AF37' }}>
                    Instagram Reel
                  </p>
                </div>
              </div>
              
              {/* Subtle texture overlay */}
              <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(212, 175, 55, 0.3) 1px, transparent 0)',
                backgroundSize: '20px 20px'
              }}></div>
            </div>
          ) : !imageError && thumbnailUrl ? (
            <img 
              src={thumbnailUrl} 
              alt={video.title}
              className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-stone-200 to-stone-300 flex items-center justify-center">
              <div className="text-center p-4">
                <Play className="w-12 h-12 mx-auto mb-2" style={{ color: '#D4AF37' }} />
                <p className="text-sm font-medium px-2 font-serif" style={{ color: '#BFA6A0' }}>{video.title}</p>
                {isShort && (
                  <p className="text-xs mt-2 opacity-75" style={{ color: '#BFA6A0' }}>
                    Video
                  </p>
                )}
              </div>
            </div>
          )}
          
          {!isInstagram && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center">
              <div className="text-center text-white p-4">
                <div className="bg-white/90 rounded-full p-3 mb-3 inline-block">
                  <Play className="w-5 h-5 ml-0.5" style={{ color: '#D4AF37' }} />
                </div>
                <h3 className="font-semibold text-lg line-clamp-2 font-serif">
                  {video.title}
                </h3>
              </div>
            </div>
          )}

          {isInstagram && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
              <div className="backdrop-blur-md rounded-full p-3 shadow-xl border" style={{
                backgroundColor: 'rgba(212, 175, 55, 0.9)',
                borderColor: 'rgba(255, 255, 255, 0.3)'
              }}>
                <Play className="w-5 h-5 ml-0.5 text-white" />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const VideoModal = () => {
    if (!showModal || !selectedVideo) return null;

    const isInstaReel = isInstagramReel(selectedVideo.url);
    const embedUrl = getEmbedUrl(selectedVideo.url);
  
    return (
      <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
        <div className="relative w-full max-w-xl mx-auto max-h-[95vh]">
          <div className="bg-white rounded-2xl overflow-hidden shadow-2xl relative flex flex-col h-full">
            <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-100 bg-white relative z-10">
              <h2 className="text-base sm:text-lg font-bold font-serif line-clamp-1 flex-1 pr-3" style={{ color: '#333333' }}>
                {selectedVideo.title}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-primary-ivory transition-colors duration-150 bg-gray-100 hover:bg-accent-gold rounded-full p-2 focus:outline-none shrink-0 ml-2"
                aria-label="Close"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto min-h-0">
              {isInstaReel ? (
                <div className="flex justify-center items-start w-full p-3 sm:p-4">
                  <div className="w-full max-w-xs">
                    <div className="relative w-full bg-gray-100 rounded-lg overflow-hidden">
                      <iframe
                        src={embedUrl}
                        title={selectedVideo.title}
                        className="w-full border-0"
                        frameBorder="0"
                        scrolling="no"
                        allowtransparency="true"
                        allow="encrypted-media"
                        style={{ 
                          height: '320px',
                          background: 'white'
                        }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                // YouTube embed
                <div className="aspect-video w-full p-3 sm:p-4">
                  <iframe
                    src={embedUrl}
                    title={selectedVideo.title}
                    className="w-full h-full rounded-lg"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
              
              {/* Footer info */}
              <div className="p-3 sm:p-4 bg-gray-50 border-t">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <p className="text-xs sm:text-sm text-gray-600">
                    Added on {new Date(selectedVideo.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <button
                    onClick={() => window.open(selectedVideo.url, '_blank')}
                    className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full transition-all duration-200 hover:shadow-md"
                    style={{ 
                      background: 'linear-gradient(135deg, #D4AF37 0%, #DCAE96 100%)',
                      color: 'white'
                    }}
                  >
                    <ExternalLink className="w-4 h-4" />
                    {isInstaReel ? 'View on Instagram' : 'Watch on YouTube'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Loading state
  if (loading) {
    return (
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #FAF9F6 0%, #FFFFF0 50%, #FAF9F6 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" style={{ color: '#D4AF37' }} />
            <p className="text-xl" style={{ color: '#BFA6A0' }}>Loading videos...</p>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #FAF9F6 0%, #FFFFF0 50%, #FAF9F6 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <div className="rounded-2xl p-8 max-w-md mx-auto border" style={{ backgroundColor: '#FFFFF0', borderColor: '#FF6F61' }}>
              <p className="mb-4" style={{ color: '#FF6F61' }}>{error}</p>
              <button 
                onClick={fetchVideos}
                className="font-bold py-3 px-6 rounded-full transition-all duration-300 hover:shadow-lg transform hover:scale-105"
                style={{ 
                  background: 'linear-gradient(135deg, #D4AF37 0%, #DCAE96 100%)',
                  color: 'white'
                }}
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20" style={{ background: 'linear-gradient(135deg, #FAF9F6 0%, #FFFFF0 50%, #FAF9F6 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-20">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 font-serif" style={{ color: '#333333' }}>
            Treatment <span style={{ 
              background: 'linear-gradient(135deg, #D4AF37 0%, #DCAE96 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Videos</span>
          </h2>
          <p className="text-xl max-w-4xl mx-auto leading-relaxed" style={{ color: '#BFA6A0' }}>
            Watch detailed treatment procedures and learn about our advanced dermatology solutions
          </p>
          <div className="w-32 h-1 mx-auto rounded-full mt-8" style={{ 
            background: 'linear-gradient(90deg, #D4AF37 0%, #DCAE96 100%)' 
          }}></div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="backdrop-blur-md rounded-2xl p-2 inline-flex shadow-xl border" style={{ 
            backgroundColor: 'rgba(255, 255, 240, 0.8)',
            borderColor: 'rgba(212, 175, 55, 0.2)'
          }}>
            {[
              { id: 'featured', label: 'Featured Videos' },
              { id: 'shorts', label: 'Instagram Reels' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform ${
                  activeTab === tab.id ? 'shadow-lg scale-105' : 'hover:scale-102'
                }`}
                style={{
                  background: activeTab === tab.id 
                    ? 'linear-gradient(135deg, #D4AF37 0%, #DCAE96 100%)'
                    : 'transparent',
                  color: activeTab === tab.id ? 'white' : '#BFA6A0'
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== tab.id) {
                    e.target.style.color = '#333333';
                    e.target.style.backgroundColor = 'rgba(212, 175, 55, 0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== tab.id) {
                    e.target.style.color = '#BFA6A0';
                    e.target.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <span className="relative z-10">{tab.label}</span>
                {activeTab === tab.id && (
                  <div className="absolute inset-0 rounded-xl blur opacity-30" style={{
                    background: 'linear-gradient(135deg, #D4AF37 0%, #DCAE96 100%)'
                  }}></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Video Grid */}
        <div className="mb-20">
          <div key={activeTab}>
            {activeTab === 'featured' ? (
              <>
                {youtubeVideos.length > 0 ? (
                  <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 carousel-container">
                      {getVisibleYouTubeVideos().map((video) => (
                        <VideoCard key={video._id} video={video} />
                      ))}
                    </div>
                  
                    {isMobile && youtubeVideos.length > 1 && (
                      <div className="flex justify-center items-center space-x-4 mt-8">
                        <button
                          onClick={handlePrevYouTube}
                          disabled={isTransitioning}
                          className="w-12 h-12 rounded-full flex items-center justify-center group shadow-lg transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                          style={{
                            background: 'linear-gradient(135deg, #D4AF37 0%, #DCAE96 100%)',
                            color: 'white'
                          }}
                          onMouseEnter={(e) => {
                            if (!isTransitioning) {
                              e.target.style.boxShadow = '0 8px 25px rgba(212, 175, 55, 0.4)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                          }}
                        >
                          <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-200" />
                        </button>

                        <button
                          onClick={handleNextYouTube}
                          disabled={isTransitioning}
                          className="w-12 h-12 rounded-full flex items-center justify-center group shadow-lg transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                          style={{
                            background: 'linear-gradient(135deg, #D4AF37 0%, #DCAE96 100%)',
                            color: 'white'
                          }}
                          onMouseEnter={(e) => {
                            if (!isTransitioning) {
                              e.target.style.boxShadow = '0 8px 25px rgba(212, 175, 55, 0.4)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                          }}
                        >
                          <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" />
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <p className="text-xl" style={{ color: '#BFA6A0' }}>No featured videos available yet.</p>
                  </div>
                )}
              </>
            ) : (
              <>
                {shortVideos.length > 0 ? (
                  <div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 carousel-container">
                      {getVisibleInstagramVideos().map((video) => (
                        <VideoCard key={video._id} video={video} isShort />
                      ))}
                    </div>
                    
                    {isMobile && shortVideos.length > 2 && (
                      <div className="flex justify-center items-center space-x-4 mt-8">
                        <button
                          onClick={handlePrevInstagram}
                          disabled={isTransitioning}
                          className="w-12 h-12 rounded-full flex items-center justify-center group shadow-lg transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                          style={{
                            background: 'linear-gradient(135deg, #D4AF37 0%, #DCAE96 100%)',
                            color: 'white'
                          }}
                          onMouseEnter={(e) => {
                            if (!isTransitioning) {
                              e.target.style.boxShadow = '0 8px 25px rgba(212, 175, 55, 0.4)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                          }}
                        >
                          <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-200" />
                        </button>

                        <button
                          onClick={handleNextInstagram}
                          disabled={isTransitioning}
                          className="w-12 h-12 rounded-full flex items-center justify-center group shadow-lg transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                          style={{
                            background: 'linear-gradient(135deg, #D4AF37 0%, #DCAE96 100%)',
                            color: 'white'
                          }}
                          onMouseEnter={(e) => {
                            if (!isTransitioning) {
                              e.target.style.boxShadow = '0 8px 25px rgba(212, 175, 55, 0.4)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                          }}
                        >
                          <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" />
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <p className="text-xl" style={{ color: '#BFA6A0' }}>No Instagram reels available yet.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* CTA Section - Only show if there are videos */}
        {videos.length > 0 && (
          <div className="text-center">
            <div className="backdrop-blur-md p-12 max-w-4xl mx-auto relative overflow-hidden rounded-2xl shadow-xl border" style={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderColor: 'rgba(212, 175, 55, 0.2)'
            }}>
              {/* Background decorative elements */}
              <div className="absolute top-0 left-0 w-40 h-40 rounded-full -translate-x-20 -translate-y-20 opacity-60" style={{
                background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.05) 0%, rgba(220, 174, 150, 0.05) 100%)'
              }}></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full translate-x-16 translate-y-16 opacity-60" style={{
                background: 'linear-gradient(135deg, rgba(220, 174, 150, 0.05) 0%, rgba(212, 175, 55, 0.05) 100%)'
              }}></div>
              
              <div className="relative z-10">
                <h3 className="text-4xl font-bold mb-6 font-serif" style={{ color: '#333333' }}>
                  Follow Us on Social Media
                </h3>
                <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed" style={{ color: '#BFA6A0' }}>
                  Stay updated with the latest treatment videos, tips, and success stories from our expert dermatologists on YouTube and Instagram.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    className="font-bold py-4 px-8 rounded-full shadow-lg transition-all duration-300 text-lg group transform hover:scale-105 hover:shadow-xl"
                    style={{ 
                      background: 'linear-gradient(135deg, #D4AF37 0%, #DCAE96 100%)',
                      color: 'white'
                    }}
                    onClick={() => window.open('https://www.youtube.com/channel/UCKJIlcCNzIFwQBP1AycUkVg', '_blank')}
                  >
                    <span className="flex items-center gap-3">
                      <Play className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                      Subscribe on YouTube
                    </span>
                  </button>
                  <button 
                    className="font-bold py-4 px-8 rounded-full shadow-lg transition-all duration-300 text-lg group transform hover:scale-105 hover:shadow-xl border-2"
                    style={{ 
                      borderColor: '#D4AF37',
                      color: '#D4AF37',
                      backgroundColor: 'transparent'
                    }}
                    onClick={() => window.open('https://www.instagram.com/p/DGSwG4ey7RP/?hl=en', '_blank')}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'linear-gradient(135deg, #D4AF37 0%, #DCAE96 100%)';
                      e.target.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'transparent';
                      e.target.style.color = '#D4AF37';
                    }}
                  >
                    <span className="flex items-center gap-3">
                      <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                      Follow on Instagram
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <VideoModal />
      
      <style jsx>{`
        .carousel-container {
          transition: transform 0.5s ease-in-out;
        }
        
        .carousel-slide {
          transition: all 0.5s ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default VideoGallery;











































