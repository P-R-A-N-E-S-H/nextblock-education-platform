import React from 'react';
import { 
  X, 
  Bell, 
  CalendarCheck, 
  FileText, 
  UploadCloud, 
  Sparkles, 
  Check, 
  CheckCheck,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const NotificationDrawer: React.FC = () => {
  const { 
    isNotificationDrawerOpen, 
    setIsNotificationDrawerOpen, 
    notifications, 
    unreadNotificationCount, 
    markNotificationAsRead, 
    markAllNotificationsAsRead,
    setCurrentRole,
    setCurrentPublicView
  } = useApp();

  if (!isNotificationDrawerOpen) return null;

  const handleNotificationClick = (actionView?: string, id?: string) => {
    if (id) markNotificationAsRead(id);
    setIsNotificationDrawerOpen(false);

    if (actionView === 'sessions' || actionView === 'documents' || actionView === 'applications') {
      setCurrentRole('student');
    } else if (actionView === 'tnea-guidance') {
      setCurrentRole('public');
      setCurrentPublicView('tnea-guidance');
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'session': return <CalendarCheck className="w-4 h-4 text-cyan-400" />;
      case 'application': return <FileText className="w-4 h-4 text-blue-400" />;
      case 'document': return <UploadCloud className="w-4 h-4 text-emerald-400" />;
      default: return <Sparkles className="w-4 h-4 text-amber-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex justify-end animate-in fade-in duration-200">
      <div className="bg-slate-900 w-full max-w-md h-full p-6 space-y-6 overflow-y-auto border-l-2 border-slate-800 shadow-2xl flex flex-col justify-between custom-scrollbar">
        
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600/20 text-cyan-400 flex items-center justify-center">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-white">Notifications</h3>
                <span className="text-[11px] text-slate-400">
                  {unreadNotificationCount > 0 ? `${unreadNotificationCount} unread alert${unreadNotificationCount > 1 ? 's' : ''}` : 'All caught up'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {unreadNotificationCount > 0 && (
                <button
                  onClick={markAllNotificationsAsRead}
                  className="text-[11px] text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1"
                >
                  <CheckCheck className="w-3.5 h-3.5" />
                  <span>Mark all read</span>
                </button>
              )}
              <button
                onClick={() => setIsNotificationDrawerOpen(false)}
                className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="space-y-3">
            {notifications.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-xs">
                No notifications right now.
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => handleNotificationClick(notif.actionView, notif.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                    notif.read
                      ? 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                      : 'bg-slate-950 border-cyan-500/30 text-white shadow-lg shadow-cyan-500/5 hover:border-cyan-400'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800">
                        {getIcon(notif.type)}
                      </div>
                      <h4 className="text-xs font-black text-white leading-tight">
                        {notif.title}
                      </h4>
                    </div>

                    {!notif.read && (
                      <span className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0" />
                    )}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed pl-8">
                    {notif.message}
                  </p>

                  <div className="flex items-center justify-between pl-8 pt-1 text-[10px] text-slate-500 font-semibold">
                    <span>{notif.time}</span>
                    <span className="text-cyan-400 font-bold flex items-center gap-1">
                      View details <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800 text-center">
          <button
            onClick={() => setIsNotificationDrawerOpen(false)}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold text-xs transition-colors"
          >
            Close Notifications
          </button>
        </div>

      </div>
    </div>
  );
};
