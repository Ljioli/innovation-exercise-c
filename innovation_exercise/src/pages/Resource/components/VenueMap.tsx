import 'echarts/extension/bmap/bmap'
import React, { useEffect, useRef, memo } from 'react'
/// <reference path="../../../types/baidu-map.d.ts" />

interface VenueMapProps {
  venueName: string
}

const VenueMap: React.FC<VenueMapProps> = memo(({ venueName }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapContainerRef.current) return
    // 检查百度地图API是否已加载
    if (window.BMapGL) {
      initMap()
    } else {
      // 动态加载百度地图API脚本
      const script = document.createElement('script')
      script.src = 'https://api.map.baidu.com/api?v=1.0&type=webgl&ak=Rax1ngofYjLj0QR6EDhHTnlZididPUVK'
      script.onload = initMap
      document.body.appendChild(script)

      // 清理函数
      return () => {
        document.body.removeChild(script)
      }
    }

    function initMap() {
      if (!mapContainerRef.current || !window.BMapGL) return

      // 初始化地图，设置石家庄为中心点（114.502461, 38.045474）
      const map = new window.BMapGL.Map(mapContainerRef.current)
      const shijiazhuangCenter = new window.BMapGL.Point(114.502461, 38.045474)
      map.centerAndZoom(shijiazhuangCenter, 11)

      // 添加缩放控件和启用滚轮缩放
      map.addControl(new window.BMapGL.NavigationControl())
      map.enableScrollWheelZoom(true)

      // 创建本地搜索对象
      const localSearch = new window.BMapGL.LocalSearch(map, {
        renderOptions: { map: map },
        onSearchComplete: function (results: any) {
          if (localSearch.getStatus() === window.BMapGL.BMAP_STATUS_SUCCESS) {
            const firstResult = results.getPoi(0)
            if (firstResult) {
              map.panTo(firstResult.point)
            }
          }
        }
      })
      // 搜索场馆名称
      if (venueName) {
        localSearch.search(venueName)
      }
    }
  }, [venueName])

  return (
    <div ref={mapContainerRef} style={{ height: '500px', width: '100%' }} />
  )
})

export default memo(VenueMap)
