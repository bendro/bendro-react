var i = require('react-intl')
i.__addLocaleData({
	'locale': 'de',
	'pluralRuleFunction': function(n, ord) {
		var s = String(n).split('.')
		if(ord)
			return 'other'
		return n == 1 && !s[1] ? 'one' : 'other'
	},
	'fields': {
		'year': {
			'displayName': 'Jahr',
			'relative': {
				'0': 'dieses Jahr',
				'1': 'nächstes Jahr',
				'-1': 'letztes Jahr'
			},
			'relativeTime': {
				'future': {
					'one': 'in einem Jahr',
					'other': 'in {0} Jahren'
				},
				'past': {
					'one': 'vor einem Jahr',
					'other': 'vor {0} Jahren'
				}
			}
		},
		'month': {
			'displayName': 'Monat',
			'relative': {
				'0': 'diesen Monat',
				'1': 'nächsten Monat',
				'-1': 'letzten Monat'
			},
			'relativeTime': {
				'future': {
					'one': 'in einem Monat',
					'other': 'in {0} Monaten'
				},
				'past': {
					'one': 'vor einem Monat',
					'other': 'vor {0} Monaten'
				}
			}
		},
		'day': {
			'displayName': 'Tag',
			'relative': {
				'0': 'heute',
				'1': 'morgen',
				'2': 'übermorgen',
				'-1': 'gestern',
				'-2': 'vorgestern'
			},
			'relativeTime': {
				'future': {
					'one': 'in einem Tag',
					'other': 'in {0} Tagen'
				},
				'past': {
					'one': 'vor einem Tag',
					'other': 'vor {0} Tagen'
				}
			}
		},
		'hour': {
			'displayName': 'Stunde',
			'relativeTime': {
				'future': {
					'one': 'in einer Stunde',
					'other': 'in {0} Stunden'
				},
				'past': {
					'one': 'vor einer Stunde',
					'other': 'vor {0} Stunden'
				}
			}
		},
		'minute': {
			'displayName': 'Minute',
			'relativeTime': {
				'future': {
					'one': 'in einer Minute',
					'other': 'in {0} Minuten'
				},
				'past': {
					'one': 'vor einer Minute',
					'other': 'vor {0} Minuten'
				}
			}
		},
		'second': {
			'displayName': 'Sekunde',
			'relative': {
				'0': 'jetzt'
			},
			'relativeTime': {
				'future': {
					'one': 'in einer Sekunde',
					'other': 'in {0} Sekunden'
				},
				'past': {
					'one': 'vor einer Sekunde',
					'other': 'vor {0} Sekunden'
				}
			}
		}
	}
});
